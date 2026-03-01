import { NamedEntity } from './common.dto';

export type Item = {
  id: string;
  realm: NamedEntity;
  category: string;
  weapon: ItemWeapon | undefined;
  armor: ItemArmor | undefined;
  info: ItemInfo;
  stakeable: boolean;
  description: string | undefined;
  imageUrl?: string;
};

export type ItemWeapon = {
  skillId: string;
  fumble: number;
  modes: WeaponMode[];
};

export type ItemArmor = {
  slot: string;
  at: number;
  enc: number;
  maneuver: number;
  rangedPenalty: number;
  perception: number;
  baseDifficulty: string;
};

export type WeaponMode = {
  type: string;
  attackTypes: string[];
  attackTable: string;
  fumbleTable: string;
  sizeAdjustment: number;
};

export type WeaponRange = {
  from: number;
  to: number;
  bonus: number;
};

export type ItemInfo = {
  cost: {
    min: number;
    average: number;
    max: number;
  };
  length: number;
  weight: number | undefined;
  weightPercent: number | undefined;
  strength: number;
  productionHours: number;
};

export interface CreateItemDto {
  id: string;
  description: string | undefined;
  //TODO
}

export interface UpdateItemDto {
  description: string | undefined;
  imageUrl: string | undefined;
  //TODO
}
