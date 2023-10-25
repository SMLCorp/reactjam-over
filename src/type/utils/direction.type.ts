export type VerticalDirection = "UP" | "DOWN";
export type HorizontalDirection = "LEFT" | "RIGHT";
export type DiagonalDirection = `${HorizontalDirection}_${VerticalDirection}`;

export type PlayerDirection =
  | VerticalDirection
  | HorizontalDirection
  | DiagonalDirection;

export type FurnitureDirection = VerticalDirection | HorizontalDirection;
