import React, { FC, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useError } from '../../../ErrorContext';
import { fetchItem } from '../../api/item';
import { Item } from '../../api/item.dto';
import { fetchRealm } from '../../api/realm';
import ItemViewActions from './ItemViewActions';

const ItemView: FC = () => {
  const location = useLocation();
  const { showError } = useError();
  const { itemId } = useParams<{ itemId?: string }>();
  const [item, setItem] = useState<Item>();
  const [realm, setRealm] = useState(null);

  useEffect(() => {
    if (item) {
      fetchRealm(item.realm)
        .then((response) => setRealm(response))
        .catch((err) => showError(err.message));
    }
  }, [item, showError]);

  useEffect(() => {
    if (location.state && location.state.item) {
      setItem(location.state.item);
    } else if (itemId) {
      fetchItem(itemId)
        .then((response) => setItem(response))
        .catch((err) => showError(err.message));
    }
  }, [location.state, itemId, showError]);

  if (!item) return <p>Loading realm...</p>;

  return (
    <>
      <ItemViewActions item={item} setItem={setItem} />
      {/* <NpcViewActions npc={npc} setNpc={setNpc} />
      <Grid container spacing={2}>
        <Grid size={2}>
          <NpcAvatar npc={npc} onNpcUpdated={setNpc} />
          <NpcViewResume npc={npc} realm={realm} />
        </Grid>
        <Grid size={10}>
          <NpcViewAttributes npc={npc} />
          <NpcViewAttacks npc={npc} setNpc={setNpc} />
          <NpcViewSkills npc={npc} setNpc={setNpc} />
        </Grid>
      </Grid> */}
      <pre>{JSON.stringify(item, null, 2)}</pre>
    </>
  );
};

export default ItemView;
