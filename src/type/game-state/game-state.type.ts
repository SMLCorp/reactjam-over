import type { Player, PlayerId } from "./player.type.ts";
import type { Item } from "./item.type.ts";

export interface GameState {
  players: Record<PlayerId, Player>;
  items: Item[];
}
