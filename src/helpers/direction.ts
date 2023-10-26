import type { PlayerDirection } from "../type/utils/direction.type";

export const normalizeDirection = ({x, y}: PlayerDirection): PlayerDirection => {
  let newX = x, newY = y;

  if (x < -1) newX = -1;
  if (x > 1) newX = 1;
  if (y < -1) newY = -1;
  if (y > 1) newY = 1;

  return {
    x: newX,
    y: newY
  }
}
