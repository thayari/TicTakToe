import { _decorator, Component, instantiate, Node, Prefab } from 'cc';
import { Screen } from './Screen';
import ScreenType from './ScreenType';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
	@property({ type: Node })
	protected rootNode: Node = null;

	@property({ type: Prefab, group: { name: 'Screens' } })
    protected uiScreens: Prefab[] = [];
	
	private _screensMap: Map<number, Node> = new Map();
	private _currentScreen: Node|null = null

	start() {
		this._createScreens()
		this._showScreen(ScreenType.MainMenu)
	}

	_showScreen(screenType): void {
		this._currentScreen = this._screensMap.get(screenType)

		this._currentScreen.setParent(this.rootNode)
		
		console.log(this._currentScreen)
	}

	_hideScreen(): void {
		// this._currentScreen.hide()
	}

	
    private _createScreens(): void {
        this._screensMap.clear();

        this.uiScreens.forEach(prefab => {
            const node: Node = instantiate(prefab)

            this._screensMap.set(node.getComponent(Screen).screenType, node);
        })

		console.log(this._screensMap)
    }
}


