import { _decorator, Button, math, UITransform, Vec3, view } from 'cc';
import { Screen } from './Screen';
import ScreenType from './ScreenType';
import { GameEventManager } from './GameEvents';

const { ccclass, property } = _decorator;

@ccclass('MainMenu')
export class MainMenu extends Screen {
	@property ({ type: ScreenType, override: true })
	public screenType = ScreenType.MainMenu

	@property ({ type: Button })
	protected startGameButton: Button = null

	protected onLoad(): void {
		this._resizeLayout()
	}

	onStartGameButtonClick(): void {
		GameEventManager.sendSwitchScreen(ScreenType.GameField)
	}

	private _resizeLayout(): void {
		const winSize: math.Size = view.getVisibleSizeInPixel()
		const windowWidth: number = winSize.width
		const windowHeight: number = winSize.height

		if (windowHeight < windowWidth) {
			const screenHeight: number = this.node.getComponent(UITransform).height

			if (screenHeight > windowHeight) {
				const scale = windowHeight / screenHeight
				const vec3scale = new Vec3(scale, scale, 1)

				this.node.setScale(vec3scale)
			}
		}
	}
}


