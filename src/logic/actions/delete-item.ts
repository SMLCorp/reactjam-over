import type { ActionContext } from "rune-games-sdk";
import type { GameState } from "../../type/game-state/game-state.type.ts";
import type { PlayerId } from "../../type/game-state/player.type.ts";
import type { TrashId } from "../../type/game-state/trash.type.ts";

export function deleteItem(
  trashId: TrashId,
  { game, playerId }: ActionContext<GameState>,
): void {
  // check if item exit
  const trash = game.map.trash[trashId];
  if (trash == null) {
    throw Error("");
  }
  // check if player exist
  const player = game.players[playerId as PlayerId];
  if (player == null) {
    throw Error("");
  }

  // TODO we should check if player is in front of the spawner

  if (player.action.name == "carry") {
    // check if item exit
    const item = game.items[player.action.payload.itemId];
    if (item == null) {
      throw Error("");
    }
    player.action = { name: "idle" };
    delete game.items[item.id];
  }
}
