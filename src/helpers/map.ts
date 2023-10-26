import type { Player } from "../type/game-state/player.type.ts";
import type { GameMap } from "../type/game-state/game-map.type.ts";
import { PLAYER_AXE_SPEED } from "../utils/constants.ts";
import { furnitureFactory } from "./furniture.ts";

export function getPlayerNewPosition(player: Player): [number, number] {
  const newPlayerPosition = sumCoordinates(player.position, [
    player.direction.x * PLAYER_AXE_SPEED,
    player.direction.y * PLAYER_AXE_SPEED,
  ]);

  // TODO check Collision

  return newPlayerPosition;
}

function sumCoordinates(
  coordA: [number, number],
  coordB: [number, number],
): [number, number] {
  return [coordA[0] + coordB[0], coordA[1] + coordB[1]];
}

export function getDefaultMap(): GameMap {
  const furniture1 = furnitureFactory.defaultFurniture.gen([0, 0]);
  const furniture2 = furnitureFactory.defaultFurniture.genNextTo(
    "RIGHT",
    furniture1,
  );
  const spawner = furnitureFactory.spawner.genNextTo(
    "RIGHT",
    furniture2,
    "tomato",
  );
  const furniture3 = furnitureFactory.defaultFurniture.genNextTo(
    "RIGHT",
    spawner,
  );
  const trash = furnitureFactory.trash.genNextTo("RIGHT", furniture3);
  const furniture4 = furnitureFactory.defaultFurniture.genNextTo(
    "RIGHT",
    trash,
  );
  const furniture5 = furnitureFactory.defaultFurniture.genNextTo(
    "RIGHT",
    furniture4,
  );
  const furniture6 = furnitureFactory.defaultFurniture.genNextTo(
    "RIGHT",
    furniture5,
  );

  const furnitureList = [
    furniture1,
    furniture2,
    furniture3,
    furniture4,
    furniture5,
    furniture6,
  ];

  const spawnerList = [spawner];

  const trashList = [trash];

  return {
    furniture: furnitureList.reduce((acc, f) => ({ ...acc, [f.id]: f }), {}),
    spawners: spawnerList.reduce((acc, f) => ({ ...acc, [f.id]: f }), {}),
    trash: trashList.reduce((acc, f) => ({ ...acc, [f.id]: f }), {}),
    dimensions: [512, 256],
  };
}
