import type { Player, PlayerId } from "../type/game-state/player.type";

export const getDefaultPlayer = (playerId: PlayerId): Player => ({
  playerId: playerId,
  displayName: "toto",
  avatarUrl:
    "https://unsplash.com/photos/closeup-photography-of-woman-smiling-mEZ3PoFGs_k",
  position: [0, 0],
  direction: "UP",
  action: {
    name: "idle",
  },
});
