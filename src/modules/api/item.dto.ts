export type Item = {
  id: string;
  realm: string;
  category: string;
  weapon?: WeaponInfo;
  stakeable: boolean;
  imageUrl?: string;
};

export type WeaponInfo = {
  skillId: string;
  fumble: number;
  // modes: WeaponMode[];
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
  weight: number;
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
