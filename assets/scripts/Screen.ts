import { _decorator, Component, Node } from 'cc';
import ScreenType from './ScreenType'

const { ccclass, property } = _decorator;

@ccclass('Screen')
export class Screen extends Component {
	@property ({ type: ScreenType, override: true })
	public screenType = ScreenType.MainMenu
}


