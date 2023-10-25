import { Sprite, Stage } from "@pixi/react";
import { useWindowSize } from "react-use";
import "./style/App.css";
import type { ItemId } from "./type/game-state/item.type";
import type { SpawnerId } from "./type/game-state/spawner.type";
import type { TrashId } from "./type/game-state/trash.type";
import type { GameState } from "./type/game-state/game-state.type.ts";
import type { PlayerId } from "./type/game-state/player.type.ts";
import { useEffect, useState } from "react";

function App() {
  const [gameState, setGame] = useState<GameState | undefined>(undefined);
  const [playerId, setPlayerId] = useState<PlayerId | undefined>(undefined);

  useEffect(() => {
    Rune.initClient({
      // onChange: ({ game, players, yourPlayerId }) => {
      onChange: ({ game, yourPlayerId, action }) => {
        if (action != null) {
          // skip action
          return;
        }
        console.log("rune onChange", game);
        setGame(game);
        setPlayerId(yourPlayerId as PlayerId);
      },
    });
  });
  const { width, height } = useWindowSize();

  const playerPos = gameState?.players[playerId ?? ("" as PlayerId)]
    ?.position ?? [0, 0];

  console.log(playerPos);

  return (
    <>
      <Stage width={width / 2} height={height / 2}>
        <Sprite
          x={playerPos[0]}
          y={playerPos[1]}
          anchor={0.5}
          image="https://pixijs.com/assets/bunny.png"
        />
      </Stage>
      <div style={{ position: "absolute", top: height / 2 + 20, left: 20 }}>
        <button onClick={(): void => { Rune.actions.dropItem("abc" as ItemId); }}>
          Drop Item
        </button>
        <button
          onClick={(): void => { Rune.actions.spawnItem("abc" as SpawnerId); }}
        >
          Spawn Item
        </button>
        <button onClick={(): void => { Rune.actions.deleteItem("abc" as TrashId); }}>
          Delete Item
        </button>

        <button onClick={(): void => { Rune.actions.movePlayer("DOWN"); }}>
          Move Down
        </button>
      </div>
    </>
  );
}

export default App;
