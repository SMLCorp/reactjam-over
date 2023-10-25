import type { Brand } from "../utils/brand.ts";
import type { Furniture } from "./furniture.type.ts";

export type TrashId = Brand<string, "TrashId">;

export interface Trash extends Furniture {
  id: TrashId;
}
