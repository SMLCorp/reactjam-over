import type { RuneClient } from "rune-games-sdk/multiplayer";

export interface GameState {

}

type GameActions = {

}

declare global {
  const Rune: RuneClient<GameState, GameActions>
}

Rune.initLogic({
  minPlayers: 1,
  maxPlayers: 2,
  setup: (): GameState => {
    return {}
  },
  actions: {

  }
})
