import { Sprite, Stage } from "@pixi/react";
import { useKey, useWindowSize } from "react-use";
import "./style/App.css";
import type { ItemId } from "./type/game-state/item.type";
import type { SpawnerId } from "./type/game-state/spawner.type";
import type { TrashId } from "./type/game-state/trash.type";
import type { GameState } from "./type/game-state/game-state.type.ts";
import type { PlayerId } from "./type/game-state/player.type.ts";
import { useEffect, useReducer, useState } from "react";
import {
  handleMovement,
  movementCondition,
  movementReducer,
} from "./utils/movement.ts";
import { Joystick } from "react-joystick-component";
import type { IJoystickUpdateEvent } from "react-joystick-component/src/Joystick.tsx";

function App() {
  const [gameState, setGame] = useState<GameState | undefined>(undefined);
  const [playerId, setPlayerId] = useState<PlayerId | undefined>(undefined);
  const [direction, setDirection] = useReducer(movementReducer, { x: 0, y: 0 });
  // refactor move state to a reducer to make change easier
  const [joystickPosX, setJoystickPosX] = useState<number>(0);
  const [joystickPosY, setJoystickPosY] = useState<number>(0);

  const handleMove = (event: IJoystickUpdateEvent): void => {
    // refactor change joystickPosX & PosY value only if it change threshold >< 0
    setJoystickPosX(event.x ?? 0);
    setJoystickPosY(event.y ?? 0);
  };

  const handleStop = (): void => {
    setJoystickPosX(0);
    setJoystickPosY(0);
  };

  useEffect(() => {
    console.log("joystick moved");
  }, [joystickPosY, joystickPosX]);

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

  useEffect(() => {
    Rune.actions.movePlayer(direction);
  }, [direction]);

  // handle player movement
  // refactor only send this event when key is down, don't do it when it's staying pressed, it send infinity event to server
  useKey(movementCondition, ({ key }) => {
    handleMovement(key, "keydown", setDirection);
  });

  useKey(
    movementCondition,
    ({ key }) => {
      handleMovement(key, "keyup", setDirection);
    },
    { event: "keyup" },
  );

  const { width, height } = useWindowSize();

  const playerPos = gameState?.players[playerId ?? ("" as PlayerId)]
    ?.position ?? [0, 0];

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
          pos={{ x: joystickPosX, y: joystickPosY }}
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
