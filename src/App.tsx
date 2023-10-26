import { Sprite, Stage } from "@pixi/react";
import { useKey, useWindowSize } from "react-use";
import "./style/App.css";
import type { ItemId } from "./type/game-state/item.type";
import type { SpawnerId } from "./type/game-state/spawner.type";
import type { TrashId } from "./type/game-state/trash.type";
import type { GameState } from "./type/game-state/game-state.type.ts";
import type { PlayerId } from "./type/game-state/player.type.ts";
import {useEffect, useMemo, useReducer, useState} from "react";
import {
  handleMovement,
  movementCondition,
  movementReducer,
} from "./utils/movement.ts";
import { Joystick } from "react-joystick-component";
import type { IJoystickUpdateEvent } from "react-joystick-component/src/Joystick.tsx";
import {GameMap} from "./components/game-map.component.tsx";

function App() {
  const [gameState, setGame] = useState<GameState | undefined>(undefined);
  const [playerId, setPlayerId] = useState<PlayerId | undefined>(undefined);
  const [direction, setDirection] = useReducer(movementReducer, { x: 0, y: 0 });
  const [joystickDirection, setJoystickDirection] = useState({ x: 0, y: 0 });

  const { width, height } = useWindowSize();

  const scale = useMemo(() => Math.min(width / (gameState?.map.dimensions[0] ?? width), height / (gameState?.map.dimensions[1] ?? height)), [width, height, gameState])

  const playerPos = gameState?.players[playerId ?? ("" as PlayerId)]
    ?.position ?? [0, 0];

  useEffect(() => {
    Rune.initClient({
      onChange: ({ game, yourPlayerId, action }) => {
        if (action) {
          // skip action
          return;
        }
        setGame(game);
        setPlayerId(yourPlayerId as PlayerId);
      },
    });
  }, []);

  const handleMove = ({ x, y }: IJoystickUpdateEvent): void => {
    const normalizedX = (x ?? 0) > 0.5 ? 1 : (x ?? 0) < -0.5 ? -1 : 0;
    const normalizedY = (y ?? 0) > 0.5 ? -1 : (y ?? 0) < -0.5 ? 1 : 0;

    if (normalizedX !== joystickDirection.x) {
      setJoystickDirection({ x: normalizedX, y: joystickDirection.y });
    }
    if (normalizedY !== joystickDirection.y) {
      setJoystickDirection({ x: joystickDirection.x, y: normalizedY });
    }
  };

  const handleStop = (): void => {
    setJoystickDirection({ x: 0, y: 0 });
  };

  useEffect(() => {
    setDirection({
      type: "joystick",
      joystickDirection,
    });
  }, [joystickDirection, joystickDirection.x, joystickDirection.y]);

  useEffect(() => {
    Rune.actions.movePlayer(direction);
  }, [direction]);

  useKey(
    movementCondition,
    ({ key }) => {
      handleMovement(key, "keydown", setDirection);
    },
    { event: "keydown" },
  );

  useKey(
    movementCondition,
    ({ key }) => {
      handleMovement(key, "keyup", setDirection);
    },
    { event: "keyup" },
  );

  const gameMap = gameState?.map ? <GameMap scale={scale} gameMap={gameState.map}/> : <></>

  return (
    <>
      <Stage width={width} height={height}>
        {gameMap}
        <Sprite
          x={playerPos[0]}
          y={playerPos[1]}
          anchor={0.5}
          scale={scale}
          image="https://pixijs.com/assets/bunny.png"
        />
      </Stage>
      <div style={{ position: "absolute", top: height / 2 + 20, left: 20 }}>
        <button
          onClick={(): void => {
            Rune.actions.dropItem("abc" as ItemId);
          }}
        >
          Drop Item
        </button>
        <button
          onClick={(): void => {
            Rune.actions.spawnItem("abc" as SpawnerId);
          }}
        >
          Spawn Item
        </button>
        <button
          onClick={(): void => {
            Rune.actions.deleteItem("abc" as TrashId);
          }}
        >
          Delete Item
        </button>
        <Joystick
          pos={joystickDirection}
          size={100}
          sticky={false}
          baseColor="red"
          stickColor="blue"
          move={handleMove}
          stop={handleStop}
        />
      </div>
    </>
  );
}

export default App;
