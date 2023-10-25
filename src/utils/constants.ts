import type { PlayerDirection } from "../type/utils/direction.type.ts";

export const PLAYER_AXE_SPEED = 6;
export const PLAYER_DIAGONAL_SPEED = 4;

export const PLAYER_POSITION_VARIATION_MATRIX: Record<
  PlayerDirection,
  [number, number]
> = {
  DOWN: [0, PLAYER_AXE_SPEED],
  LEFT: [-PLAYER_DIAGONAL_SPEED, 0],
  RIGHT_DOWN: [PLAYER_DIAGONAL_SPEED, PLAYER_DIAGONAL_SPEED],
  LEFT_DOWN: [-PLAYER_DIAGONAL_SPEED, PLAYER_DIAGONAL_SPEED],
  RIGHT: [PLAYER_AXE_SPEED, 0],
  UP: [0, -PLAYER_AXE_SPEED],
  LEFT_UP: [-PLAYER_DIAGONAL_SPEED, -PLAYER_DIAGONAL_SPEED],
  RIGHT_UP: [PLAYER_DIAGONAL_SPEED, -PLAYER_DIAGONAL_SPEED],
};

//
//  + ----------> x
//  |
//  |
//  |
//  y
//