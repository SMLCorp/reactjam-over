import type { ItemId } from "./item.type.ts";
import type { SpawnerId } from "./spawner.type.ts";
import type { TrashId } from "./trash.type.ts";
import type { PlayerDirection } from "../utils/direction.type.ts";

export type GameActions = {
  dropItem: (itemId: ItemId) => void;
  spawnItem: (spannerId: SpawnerId) => void;
  deleteItem: (trashId: TrashId) => void;
  movePlayer: (direction: PlayerDirection) => void;
};
