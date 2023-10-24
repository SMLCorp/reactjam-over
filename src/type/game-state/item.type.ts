export type ItemId = string & { _brand: "ItemId" };

export interface Item {
  id: ItemId;
}
