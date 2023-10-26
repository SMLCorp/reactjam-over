import type {
  HorizontalDirection,
  PlayerDirection,
  VerticalDirection,
} from "../type/utils/direction.type";

export interface MovementAction {
  type: "keydown" | "keyup" | "joystick";
  direction?: HorizontalDirection | VerticalDirection;
  joystickDirection?: PlayerDirection;
}

export interface KeyboardMovementAction extends MovementAction {
  type: "keydown" | "keyup";
  direction: HorizontalDirection | VerticalDirection;
}

export interface JoystickMovementAction extends MovementAction {
  type: "joystick";
  joystickDirection: PlayerDirection;
}

export const movementCondition = (event: KeyboardEvent) =>
  ["ArrowUp", "ArrowDown", "ArrowRight", "ArrowLeft"].includes(event.key);

export const handleMovement = (
  key: string,
  type: "keyup" | "keydown",
  action: (params: KeyboardMovementAction | JoystickMovementAction) => void,
) => {
  switch (key) {
    case "ArrowUp":
      action({ direction: "UP", type });
      break;
    case "ArrowDown":
      action({ direction: "DOWN", type });
      break;
    case "ArrowRight":
      action({ direction: "RIGHT", type });
      break;
    case "ArrowLeft":
      action({ direction: "LEFT", type });
      break;
    default:
      break;
  }
};

export const movementReducer = (
  state: PlayerDirection,
  action: KeyboardMovementAction | JoystickMovementAction,
): PlayerDirection => {
  const { type } = action;
  let { x, y } = state;
  if (type === "joystick") {
    const { joystickDirection } = action;
    x = joystickDirection.x;
    y = joystickDirection.y;
  } else {
    const { direction } = action;
    switch (direction) {
      case "UP":
        y = type === "keydown" ? Math.max(-1, state.y - 1) : state.y + 1;
        break;
      case "DOWN":
        y = type === "keydown" ? Math.min(1, state.y + 1) : state.y - 1;
        break;
      case "RIGHT":
        x = type === "keydown" ? Math.min(1, state.x + 1) : state.x - 1;
        break;
      case "LEFT":
        x = type === "keydown" ? Math.max(-1, state.x - 1) : state.x + 1;
        break;
      default:
        break;
    }
  }

  return {
    x,
    y,
  };
};
