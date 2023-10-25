import type { GameState } from "../../type/game-state/game-state.type";
import type { PlayerId } from "../../type/game-state/player.type";

export const playerLeft = (
  playerId: string,
  { game }: { game: GameState },
): void => {
  delete game.players[playerId as PlayerId];
};
