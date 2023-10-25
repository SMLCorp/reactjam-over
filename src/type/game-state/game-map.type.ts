import type { Spawner, SpawnerId } from "./spawner.type.ts";
import type { Trash, TrashId } from "./trash.type.ts";

export interface GameMap {
  spawners: Record<SpawnerId, Spawner>;
  trash: Record<TrashId, Trash>;
}
