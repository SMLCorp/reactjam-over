import type { Player } from "rune-games-sdk";
import type { Item } from "./item.type.ts";

export interface GameState {
  players: Player[];
  items: Item[];
}
