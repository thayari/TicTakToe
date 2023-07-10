import { Enum, EventTarget } from "cc";
import ScreenType from "./ScreenType";

export const eventTarget = new EventTarget()

export const GameEvent = Enum({
	SWITCH_SCREEN: 1,
	RANDOMIZE_TOGGLE: 2,
	CALCULATE_TOGGLE: 3
})

export class GameEventManager {
	public static sendSwitchScreen = (screenToOpen): void => eventTarget.emit(GameEvent.SWITCH_SCREEN, screenToOpen)
	public static sendRandomizeToggle = (): void => eventTarget.emit(GameEvent.RANDOMIZE_TOGGLE)
	public static sendCalculateToggle = (): void => eventTarget.emit(GameEvent.CALCULATE_TOGGLE)
}