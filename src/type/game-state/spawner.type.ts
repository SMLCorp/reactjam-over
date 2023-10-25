import type { Brand } from "../utils/brand.ts";
import type { ItemType } from "./item.type.ts";
import type { Furniture } from "./furniture.type.ts";

export type SpawnerId = Brand<string, "SpawnerId">;

export interface Spawner extends Furniture {
  id: SpawnerId;
  spawnType: ItemType;
}
