import type { ItemId } from "./item.type.ts";

export type PlayerId = string & { _brand: "PlayerId" };

export interface Player {
  id: PlayerId;
  name: string;
  position: [number, number];
  direction: "UP" | "RIGHT" | "LEFT" | "DOWN";
  action: PlayerAction;
}

export type PlayerAction = PlayerActionCarry | PlayerActionIdle;

export interface PlayerActionCarry {
  name: "carry";
  payload: {
    itemId: ItemId;
  };
}

export interface PlayerActionIdle {
  name: "idle";
  payload: null;
}
