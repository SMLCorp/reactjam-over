import type { Player } from "../type/game-state/player.type.ts";
import type { GameMap } from "../type/game-state/game-map.type.ts";
import { PLAYER_POSITION_VARIATION_MATRIX } from "../utils/constants.ts";
import type { PlayerDirection } from "../type/utils/direction.type.ts";

export function getPlayerNewPosition(
  player: Player,
  _map: GameMap,
  direction: PlayerDirection,
): [number, number] {
  const newPlayerPosition = sumCoordinates(
    player.position,
    PLAYER_POSITION_VARIATION_MATRIX[direction],
  );

  // TODO check Collision

  return newPlayerPosition;
}

function sumCoordinates(
  coordA: [number, number],
  coordB: [number, number],
): [number, number] {
  return [coordA[0] + coordB[0], coordA[1] + coordB[1]];
}
