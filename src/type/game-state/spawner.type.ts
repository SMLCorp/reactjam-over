import type { Brand } from "../brand.ts";
import type {ItemType} from "./item.type.ts";

export type SpawnerId = Brand<string, "SpawnerId">;

export interface Spawner {
  id: SpawnerId;
  spawnType: ItemType
  position: [number, number]
  direction: "UP" | "RIGHT" | "LEFT" | "DOWN";
}
