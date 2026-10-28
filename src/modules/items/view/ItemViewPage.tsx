/* eslint-disable react-hooks/exhaustive-deps */
import React, { ReactElement, ReactNode, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ExtensionIcon from '@mui/icons-material/Extension';
import PaidIcon from '@mui/icons-material/Paid';
import SportsMmaIcon from '@mui/icons-material/SportsMma';
import TuneIcon from '@mui/icons-material/Tune';
import { Box, Chip, Stack } from '@mui/material';
import {
  defaultImages,
  deleteItem,
  DetailPage,
  fetchItem,
  fetchRealm,
  ImageSelectorDialog,
  Item,
  itemCategoryImage,
  itemCategoryLabel,
  itemImageUrl,
  itemName,
  MoneyDisplay,
  RARITY_COLORS,
  Realm,
  resolveAssetUrl,
  SectionNav,
  StatPill,
  updateItem,
  UpdateItemDto,
  useEntity,
  useNotify,
  useSectionParam,
  weaponSkillLabel,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import {
  ItemCombatSection,
  ItemEconomySection,
  ItemFeaturesSection,
  ItemModifiersSection,
  ItemSectionId,
  ItemSummarySection,
  visibleItemSections,
} from './ItemViewSections';

const sectionIcons: Record<ItemSectionId, ReactElement> = {
  summary: <DashboardIcon />,
  combat: <SportsMmaIcon />,
  features: <ExtensionIcon />,
  modifiers: <TuneIcon />,
  economy: <PaidIcon />,
};

/**
 * The first of the images that loads: the item's own (or `images/items/<id>.png`), its category's, the generic one.
 * The hero avatar has no fallback chain of its own.
 */
const useLoadedImage = (item: Item | undefined): string | undefined => {
  const candidates = item
    ? [itemImageUrl(item), resolveAssetUrl(itemCategoryImage(item.category)), resolveAssetUrl(defaultImages.item)]
    : [];
  const key = candidates.join('|');
  const [loaded, setLoaded] = useState<string>();
  useEffect(() => {
    if (candidates.length === 0) return undefined;
    let cancelled = false;
    const tryFrom = (index: number) => {
      if (index >= candidates.length) return;
      const image = new Image();
      image.onload = () => !cancelled && setLoaded(candidates[index]);
      image.onerror = () => !cancelled && tryFrom(index + 1);
      image.src = candidates[index];
    };
    tryFrom(0);
    return () => {
      cancelled = true;
    };
  }, [key]);
  return loaded && candidates.includes(loaded) ? loaded : undefined;
};

/** View of a catalog item in the style of the character sheet (spec 046, decision 14). */
export default function ItemViewPage() {
  const auth = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const notify = useNotify();
  const { itemId } = useParams<{ itemId?: string }>();
  const state = useEntity<Item>(itemId, (id) => fetchItem(id, auth), {
    initial: location.state?.item,
    onError: notify.error,
  });
  const item = state.entity;
  const [realm, setRealm] = useState<Realm>();
  const [imageDialogOpen, setImageDialogOpen] = useState(false);
  const sections = visibleItemSections(item, t);
  const sectionKey = sections.join(',');
  const sectionIds = useMemo(() => sections, [sectionKey]);
  const [section, setSection] = useSectionParam(sectionIds);
  const image = useLoadedImage(item);
  // The filters of the list it was opened from (spec 046, decision 7)
  const listUrl = `/items${typeof location.state?.from === 'string' ? location.state.from : ''}`;

  useEffect(() => {
    if (!item?.realmId) {
      setRealm(undefined);
      return;
    }
    fetchRealm(item.realmId, auth).then(setRealm).catch(notify.error);
  }, [item?.realmId]);

  const onDelete = (entity: Item) =>
    deleteItem(entity.id, auth)
      .then(() => navigate(listUrl, { replace: true }))
      .catch(notify.error);

  const onImageSelected = (entity: Item, imageUrl: string) =>
    updateItem(entity.id, { imageUrl } as UpdateItemDto, auth)
      .then(state.setEntity)
      .catch(notify.error);

  const pills = (entity: Item): ReactNode[] => {
    const result: ReactNode[] = [];
    const { armor, shield, weapon, info } = entity;
    if (armor) {
      result.push(<StatPill key="at" label={t('at-short')} hint={t('at')} value={armor.at} />);
      result.push(
        <StatPill key="enc" label={t('enc-short')} hint={t('encumbrance')} value={armor.enc ? `${armor.enc}%` : '-'} />
      );
      result.push(
        <StatPill
          key="mp"
          label={t('maneuver-penalty-short')}
          hint={t('maneuver-penalty')}
          value={armor.maneuverPenalty}
          signed
        />
      );
    }
    if (shield) {
      result.push(<StatPill key="db" label={t('db-short')} hint={t('db')} value={shield.db} signed />);
      result.push(<StatPill key="blocks" label={t('block-count')} value={shield.blockCount} />);
    }
    if (weapon) {
      result.push(<StatPill key="skill" label={t('skill')} value={weaponSkillLabel(weapon.skillId, t)} />);
      result.push(<StatPill key="fumble" label={t('fumble')} value={weapon.fumble} />);
    }
    if (info.weight !== null && info.weight !== undefined) {
      result.push(<StatPill key="weight" label={t('weight')} value={`${info.weight} ${t('lbs')}`} />);
    }
    if (info.cost?.average) {
      result.push(
        <StatPill
          key="cost"
          label={t('cost')}
          hint={t('cost-average')}
          value={<MoneyDisplay gold={info.cost.average} variant="subtitle1" />}
        />
      );
    }
    return result;
  };

  const chips = (entity: Item): ReactNode[] => [
    <Chip key="rarity" label={t(entity.info.rarity)} color={RARITY_COLORS[entity.info.rarity]} />,
    ...(entity.info.unique ? [<Chip key="unique" label={t('unique')} color="secondary" variant="outlined" />] : []),
    ...(entity.info.stackable ? [<Chip key="stackable" label={t('stackable')} variant="outlined" />] : []),
    ...(entity.weapon?.tags ?? []).map((tag) => (
      <Chip key={`tag-${tag}`} label={t(`weapon-tag-${tag}`, { defaultValue: tag })} variant="outlined" />
    )),
  ];

  const renderSection = (entity: Item): Record<ItemSectionId, ReactNode> => ({
    summary: <ItemSummarySection item={entity} realm={realm} />,
    combat: <ItemCombatSection item={entity} />,
    features: <ItemFeaturesSection item={entity} />,
    modifiers: <ItemModifiersSection item={entity} />,
    economy: <ItemEconomySection item={entity} />,
  });

  return (
    <DetailPage
      breadcrumbs={[
        { name: t('home'), link: '/' },
        { name: t('items'), link: listUrl },
        { name: item ? itemName(item, t) : t('view') },
      ]}
      entity={state}
      technicalInfo={false}
      onEdit={(entity) => navigate(`/items/edit/${entity.id}`, { state: { item: entity } })}
      onDelete={onDelete}
      hero={(entity) => ({
        title: itemName(entity, t),
        overline: [itemCategoryLabel(entity.category, t), realm ? t(realm.name) : undefined]
          .filter(Boolean)
          .join(' · '),
        image,
        onImageClick: () => setImageDialogOpen(true),
        imageActionLabel: t('change-image'),
        chips: chips(entity),
        pills: pills(entity),
      })}
    >
      {(entity) => (
        <Stack spacing={2}>
          {sections.length > 1 && (
            <SectionNav
              label={t('item-sections')}
              value={section}
              onChange={setSection}
              sections={sections.map((id) => ({
                id,
                label: t(id === 'features' ? 'item-features' : id),
                icon: sectionIcons[id],
              }))}
            />
          )}
          <Box key={section}>{renderSection(entity)[section as ItemSectionId]}</Box>
          <ImageSelectorDialog
            value={entity.imageUrl || image}
            open={imageDialogOpen}
            onClose={() => setImageDialogOpen(false)}
            onSelect={(selected) => onImageSelected(entity, selected)}
          />
        </Stack>
      )}
    </DetailPage>
  );
}
