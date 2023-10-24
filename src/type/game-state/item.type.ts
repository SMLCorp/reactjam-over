import type { Brand } from "../brand";

export type ItemId = Brand<string, "ItemId">;

export interface Item {
  id: ItemId;
}
