import type { RuneClient } from "rune-games-sdk/multiplayer";
import type { GameState } from "../type/game-state/game-state.type.ts";

interface GameActions {}

declare global {
  // @ts-expect-error
  const Rune: RuneClient<GameState, GameActions>;
}

Rune.initLogic({
  minPlayers: 1,
  maxPlayers: 2,
  setup: (): GameState => {
    return {items: [], players: []};
  },
  actions: {},
});
