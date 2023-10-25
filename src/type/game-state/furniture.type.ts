import type { FurnitureDirection } from "../utils/direction.type.ts";
import type { Brand } from "../utils/brand.ts";

export type FurnitureId = Brand<string, "FurnitureId">;

export interface Furniture {
  position: [number, number];
  width: number;
  height: number;
  asset: string;
  direction: FurnitureDirection;
}

export interface DefaultFurniture extends Furniture {
  id: FurnitureId;
}
