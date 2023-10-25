import type { Player as PlayerRune } from "rune-games-sdk";
import type { Brand } from "../brand.ts";
import type { ItemId } from "./item.type.ts";
import type { PlayerDirection } from "../utils/direction.type.ts";

export type PlayerId = Brand<string, "PlayerId">;

export interface Player extends PlayerRune {
  playerId: PlayerId;
  position: [number, number];
  nextPosition?: [number, number];
  direction: PlayerDirection;
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
}
