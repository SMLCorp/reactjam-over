import type { ActionContext } from "rune-games-sdk";
import type { GameState } from "../../type/game-state/game-state.type.ts";
import type { ItemId } from "../../type/game-state/item.type.ts";
import type { PlayerId } from "../../type/game-state/player.type.ts";

export function dropItem(
  itemId: ItemId,
  { game, playerId }: ActionContext<GameState>,
): void {
  const item = game.items[itemId];
  if (!item) {
    throw Error("");
  }

  const player = game.players[playerId as PlayerId];
  if (!player) {
    throw Error("");
  }

  if (player.action.name == "carry") {
    if (player.action.payload.itemId === itemId) {
      player.action = { name: "idle" };
      item.position = [...player.position];
    }
  }
}
