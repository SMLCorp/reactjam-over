import { getDefaultPlayer } from "../../helpers/player";
import type { GameState } from "../../type/game-state/game-state.type";
import type { PlayerId } from "../../type/game-state/player.type";

export const playerJoined = (
  playerId: string,
  { game }: { game: GameState },
): void => {
  game.players[playerId as PlayerId] = getDefaultPlayer(playerId as PlayerId)
};
