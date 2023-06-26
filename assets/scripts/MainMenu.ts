import { _decorator, Button, Component, Node } from 'cc';
import { ScreenType } from './GameManager';
const { ccclass, property } = _decorator;

@ccclass('MainMenu')
export class MainMenu extends Component {
	@property
	public screenType = ScreenType.MAIN_MENU
	@property ({ type: Button })
	protected startGameButton: Button = null

    start() {

    }

    update(deltaTime: number) {
        
    }
		
		onStartGameButtonClick(): void {

		}
}


