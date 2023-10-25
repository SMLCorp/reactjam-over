import type { RuneClient } from "rune-games-sdk/multiplayer";
import type { GameState } from "../type/game-state/game-state.type.ts";
import type { GameActions } from "../type/game-state/actions.type.ts";
import { playerJoined } from "./events/player-joined.ts";
import { playerLeft } from "./events/player-left.ts";
import type { PlayerId } from "../type/game-state/player.type.ts";
import { getDefaultPlayer } from "../helpers/player.ts";
import { dropItem } from "./actions/drop-item.ts";
import { spawnItem } from "./actions/spawn-item.ts";
import { deleteItem } from "./actions/delete-item.ts";
import { movePlayer } from "./actions/move-player.ts";

declare global {
  const Rune: RuneClient<GameState, GameActions>;
}

Rune.initLogic({
  minPlayers: 1,
  maxPlayers: 2,
  updatesPerSecond: 1,
  setup: (playerIds): GameState => {
    return {
      map: {
        spawners: {},
        trash: {},
      },
      items: {},
      players: playerIds.reduce<GameState["players"]>(
        (acc, playerId) => ({
          ...acc,
          [playerId]: getDefaultPlayer(playerId as PlayerId),
        }),
        {},
      ),
    };
  },
  update: ({ game }) => {
    Object.values(game.players).forEach((player) => {
      if (player) {
        if (player.nextPosition) {
          player.position = player.nextPosition;
          delete player.nextPosition;
        }
      }
    });
  },
  actions: {
    dropItem,
    spawnItem,
    deleteItem,
    movePlayer,
  },
  events: {
    playerJoined,
    playerLeft,
  },
});
