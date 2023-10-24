import type { Player, PlayerId } from "./player.type.ts";
import type {Item, ItemId} from "./item.type.ts";
import type {GameMap} from "./game-map.type.ts";

export interface GameState {
  players: Record<PlayerId, Player>;
  items: Record<ItemId, Item>;
  map: GameMap
}
