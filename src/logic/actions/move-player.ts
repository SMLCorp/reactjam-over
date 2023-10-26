import type { ActionContext } from "rune-games-sdk";
import type { GameState } from "../../type/game-state/game-state.type.ts";
import type { PlayerId } from "../../type/game-state/player.type.ts";
import type { PlayerDirection } from "../../type/utils/direction.type.ts";
import { normalizeDirection } from "../../helpers/direction.ts";

export function movePlayer(
  direction: PlayerDirection,
  { game, playerId }: ActionContext<GameState>,
): void {
  const player = game.players[playerId as PlayerId];
  if (!player) {
    throw Error("");
  }

  player.direction = normalizeDirection(direction);
}
