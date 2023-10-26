export type VerticalDirection = "UP" | "DOWN";
export type HorizontalDirection = "LEFT" | "RIGHT";
// export type DiagonalDirection = `${HorizontalDirection}_${VerticalDirection}`;

export interface PlayerDirection {
  x: number;
  y: number;
}

export type FurnitureDirection = VerticalDirection | HorizontalDirection;
