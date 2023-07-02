import { _decorator, Component, Node } from 'cc';
import { Screen } from './Screen';
import ScreenType from './ScreenType';
const { ccclass, property } = _decorator;

@ccclass('GameFieldScreen')
export class GameFieldScreen extends Screen {
    @property ({ type: ScreenType, override: true })
	public screenType = ScreenType.GameField

    start() {

    }

    update(deltaTime: number) {
        
    }
}


