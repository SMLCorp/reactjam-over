import type {
  DefaultFurniture,
  Furniture,
  FurnitureId,
} from "../type/game-state/furniture.type.ts";
import type { FurnitureDirection } from "../type/utils/direction.type.ts";
import type { Spawner, SpawnerId } from "../type/game-state/spawner.type.ts";
import type { ItemType } from "../type/game-state/item.type.ts";
import type { Trash, TrashId } from "../type/game-state/trash.type.ts";

export abstract class FurnitureFactory {
  protected genFurniture(
    position: [number, number],
    direction: FurnitureDirection = "DOWN",
  ): Furniture {
    return {
      asset: "",
      direction: direction,
      position: [...position],
      width: 64,
      height: 64,
    };
  }

  protected genFurnitureNextTo(
    where: "RIGHT" | "LEFT",
    furniture: Furniture,
  ): Furniture {
    return {
      asset: "",
      direction: furniture.direction,
      position: [
        furniture.position[0] + (where === "LEFT" ? -1 : 1) * furniture.width,
        furniture.position[1],
      ],
      width: 64,
      height: 64,
    };
  }
}

export class SpawnerFactory extends FurnitureFactory {
  gen(
    position: [number, number],
    spawnType: ItemType,
    direction: FurnitureDirection = "DOWN",
  ): Spawner {
    return {
      ...this.genFurniture(position, direction),
      spawnType: spawnType,
      id: crypto.randomUUID() as SpawnerId,
      asset: `src/assets/furniture/spawner-${spawnType}.png`
    };
  }

  genNextTo(
    where: "RIGHT" | "LEFT",
    furniture: Furniture,
    spawnType: ItemType,
  ): Spawner {
    return {
      ...this.genFurnitureNextTo(where, furniture),
      spawnType: spawnType,
      id: crypto.randomUUID() as SpawnerId,
      asset: `src/assets/furniture/spawner-${spawnType}.png`
    };
  }
}

export class DefaultFurnitureFactory extends FurnitureFactory {
  gen(
    position: [number, number],
    direction: FurnitureDirection = "DOWN",
  ): DefaultFurniture {
    return {
      ...this.genFurniture(position, direction),
      id: crypto.randomUUID() as FurnitureId,
      asset: "src/assets/furniture/default-furniture.png"
    };
  }

  genNextTo(where: "RIGHT" | "LEFT", furniture: Furniture): DefaultFurniture {
    return {
      ...this.genFurnitureNextTo(where, furniture),
      id: crypto.randomUUID() as FurnitureId,
      asset: "src/assets/furniture/default-furniture.png"
    };
  }
}

export class TrashFactory extends FurnitureFactory {
  gen(
    position: [number, number],
    direction: FurnitureDirection = "DOWN",
  ): Trash {
    return {
      ...this.genFurniture(position, direction),
      id: crypto.randomUUID() as TrashId,
      asset: "src/assets/furniture/furniture-trash.png"
    };
  }

  genNextTo(where: "RIGHT" | "LEFT", furniture: Furniture): Trash {
    return {
      ...this.genFurnitureNextTo(where, furniture),
      id: crypto.randomUUID() as TrashId,
      asset: "src/assets/furniture/furniture-trash.png"
    };
  }
}

export const furnitureFactory = {
  defaultFurniture: new DefaultFurnitureFactory(),
  spawner: new SpawnerFactory(),
  trash: new TrashFactory(),
};
