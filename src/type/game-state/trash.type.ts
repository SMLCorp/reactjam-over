import type {Brand} from "../brand.ts";

export type TrashId = Brand<string, "TrashId">;

export interface Trash {
  id: TrashId,
  position: [number, number],
  direction: "UP" | "RIGHT" | "LEFT" | "DOWN"
}
