import { Sprite, Stage } from "@pixi/react";
import { useWindowSize } from "react-use";
import "./style/App.css";
import type { ItemId } from "./type/game-state/item.type";
import type { SpawnerId } from "./type/game-state/spawner.type";
import type { TrashId } from "./type/game-state/trash.type";

function App() {
  const { width, height } = useWindowSize();

  return (
    <>
      <Stage width={width / 2} height={height / 2}>
        <Sprite
          x={width / 2}
          y={height / 2}
          anchor={0.5}
          image="https://pixijs.com/assets/bunny.png"
        />
      </Stage>
      <div style={{ position: "absolute", top: height / 2 + 20, left: 20 }}>
        <button onClick={(): void => Rune.actions.dropItem("abc" as ItemId)}>
          Drop Item
        </button>
        <button onClick={(): void => Rune.actions.spawnItem("abc" as SpawnerId)}>
          Spawn Item
        </button>
        <button onClick={(): void => Rune.actions.deleteItem("abc" as TrashId)}>
          Delete Item
        </button>


      </div>
    </>
  );
}

export default App;
