import type {Item, ItemId} from "../type/game-state/item.type.ts";
import type {Spawner} from "../type/game-state/spawner.type.ts";

export function createItem(spawner: Spawner): Item {
  return {
    id: crypto.randomUUID() as ItemId, type: spawner.spawnType, position: [...spawner.position]
  }
}
