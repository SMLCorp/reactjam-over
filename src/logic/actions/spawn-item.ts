import type { ActionContext } from "rune-games-sdk";
import type { GameState } from "../../type/game-state/game-state.type.ts";
import type { PlayerId } from "../../type/game-state/player.type.ts";
import type { SpawnerId } from "../../type/game-state/spawner.type.ts";
import { createItem } from "../../helpers/item.ts";

export function spawnItem(
  spawnerId: SpawnerId,
  { game, playerId }: ActionContext<GameState>,
): void {
  const spawner = game.map.spawners[spawnerId];
  if (!spawner) {
    throw Error("");
  }

  const player = game.players[playerId as PlayerId];
  if (!player) {
    throw Error("");
  }

  // TODO we should check if player is in front of the spawner

  const newItem = createItem(spawner);
  game.items[newItem.id] = newItem;
}
