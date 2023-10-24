import type { Brand } from "../brand";

export type ItemId = Brand<string, "ItemId">;

export type ItemType = "tomato" | "potato";

export interface Item {
  id: ItemId;
  position?: [number, number];
  type: ItemType;
}
