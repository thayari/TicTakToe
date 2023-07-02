import { _decorator, Button, Component, Node } from 'cc';
import { Screen } from './Screen';
import ScreenType from './ScreenType';
const { ccclass, property } = _decorator;

@ccclass('MainMenu')
export class MainMenu extends Screen {
	@property ({ type: ScreenType, override: true })
	public screenType = ScreenType.MainMenu

	@property ({ type: Button })
	protected startGameButton: Button = null

    start() {

    }

    update(deltaTime: number) {
        
    }
		
	onStartGameButtonClick(): void {

	}
}


