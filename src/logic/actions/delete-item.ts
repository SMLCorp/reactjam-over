import type { ActionContext } from "rune-games-sdk";
import type { GameState } from "../../type/game-state/game-state.type.ts";
import type { PlayerId } from "../../type/game-state/player.type.ts";
import type { TrashId } from "../../type/game-state/trash.type.ts";

export function deleteItem(
  trashId: TrashId,
  { game, playerId }: ActionContext<GameState>,
): void {
  const trash = game.map.trash[trashId];
  if (!trash) {
    throw Error("");
  }

  const player = game.players[playerId as PlayerId];
  if (!player) {
    throw Error("");
  }

  // TODO we should check if player is in front of the trash

  if (player.action.name == "carry") {
    const item = game.items[player.action.payload.itemId];
    if (!item) {
      throw Error("");
    }
    player.action = { name: "idle" };

    delete game.items[item.id];
  }
}
