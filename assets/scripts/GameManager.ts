import { _decorator, Component, Node, Prefab } from 'cc';
const { ccclass, property } = _decorator;

export enum ScreenType {
	MAIN_MENU,
	GAME_FIELD
}

@ccclass('GameManager')
export class GameManager extends Component {
	@property({ type: Node })
	protected rootNode: Node = null;

	@property({ type: Prefab })
	protected mainMenuPrefab: Prefab|null = null;

	@property({ type: Prefab })
	protected gameFieldPrefab: Prefab|null = null;

	@property({ type: Node })
	protected currentScreen: Node|null = null

	start() {
		this._showScreen(ScreenType.MAIN_MENU)
	}

	_showScreen(screenType: ScreenType): void {
		console.log(screenType)
		console.log(this.mainMenuPrefab)
	}

	_hideScreen(screenType: ScreenType): void {

	}
}


