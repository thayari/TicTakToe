import { _decorator, Component, instantiate, Node, Prefab } from 'cc';
import { Screen } from './Screen';
import ScreenType from './ScreenType';
import { eventTarget, GameEvent } from './GameEvents';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
	@property({ type: Node })
	protected rootNode: Node = null;

	@property({ type: Prefab, group: { name: 'Screens' } })
	protected uiScreens: Prefab[] = [];

	@property({ type: Number })
	public gridSize: number

	private static _instance: GameManager = null;
	
	private _screensMap: Map<number, Node> = new Map();
	private _currentScreen: Node|null = null

	start() {
		if (GameManager._instance !== null) {
      console.warn('GameManager already has an instance. Destroying new instance.')
      this.node.destroy()
      return
    }

    GameManager._instance = this

		this._createScreens()
		this._showScreen(ScreenType.MainMenu)

		eventTarget.on(GameEvent.SWITCH_SCREEN, this.switchScreen, this)
	}

	switchScreen(screenToOpen): void {
		this._showScreen(screenToOpen)
	}

	private _showScreen(screenType): void {
		if (this._currentScreen) {
			this._currentScreen.removeFromParent()
		}

		this._currentScreen = this._screensMap.get(screenType)

		this._currentScreen.setParent(this.rootNode)
	}

	private _createScreens(): void {
		this._screensMap.clear();

		this.uiScreens.forEach(prefab => {
			const node: Node = instantiate(prefab)

			this._screensMap.set(node.getComponent(Screen).screenType, node)
		})
	}

	public static get instance(): GameManager {
    return GameManager._instance
  }

	public getGridSize(): number {
    return this.gridSize
  }
}


