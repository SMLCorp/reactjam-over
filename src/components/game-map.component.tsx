import { Sprite } from "@pixi/react";
import type {GameMap} from "../type/game-state/game-map.type.ts";


export function GameMap(props: {gameMap: GameMap, scale: number}) {

  const furnitureList =  [
    ...Object.values(props.gameMap.furniture),
    ...Object.values(props.gameMap.spawners),
    ...Object.values(props.gameMap.trash)
  ].filter(f => f !== undefined).map(furniture => <Sprite
    x={furniture!.position[0] * props.scale}
    y={furniture!.position[1] * props.scale}
    anchor={0}
    scale={props.scale}
    image={furniture?.asset}
  />)

  return <>{furnitureList}</>;
}
