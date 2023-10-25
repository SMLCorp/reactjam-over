import type { ActionContext } from "rune-games-sdk";
import type { GameState } from "../../type/game-state/game-state.type.ts";
import type { ItemId } from "../../type/game-state/item.type.ts";
import type { PlayerId } from "../../type/game-state/player.type.ts";

export function dropItem(
  itemId: ItemId,
  { game, playerId }: ActionContext<GameState>,
): void {
  // check if item exit
  const item = game.items[itemId];
  if (item == null) {
    throw Error("");
  }
  // check if player exist
  const player = game.players[playerId as PlayerId];
  if (player == null) {
    throw Error("");
  }

  if (player.action.name == "carry") {
    if (player.action.payload.itemId === itemId) {
      player.action = { name: "idle" };
      item.position = [...player.position];
    }
  }
}
