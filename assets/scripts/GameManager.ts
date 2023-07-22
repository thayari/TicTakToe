import { _decorator, Component, instantiate, Node, Prefab } from 'cc';
import { Screen } from './Screen';
import ScreenType from './ScreenType';
import { eventTarget, GameEvent, GameEventManager } from './GameEvents';
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

	private _state: Array<Array<number>> | null = null
	
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
		eventTarget.on(GameEvent.CALCULATE_TOGGLE, this._calculateResult, this)
	}

	public switchScreen(screenToOpen): void {
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

	
	private _calculateResult(): void {
		const size: number = GameManager.instance.gridSize
		const grid = this.state
		const matches = []
		let sample: number
		let match: boolean = true
		
		// check rows
		for (let k = 0; k < size; k ++) {    
			sample = grid[k][0]
			match = true
			
			for (let i = 1; i < size; i ++) {
				if (grid[k][i] != sample) {
					match = false
					break
				} 
			}
			
			if (match) matches.push(sample)
		}
		
		// check columns
		for (let k = 0; k < size; k ++) {
			sample = grid[0][k]
			match = true
			
			for (let i = 1; i < size; i ++) {
				if (grid[i][k] != sample) {
					match = false
					break
				} 
			}
			
			if (match) matches.push(sample)
		}
		
		// check diagonals
		sample = grid[0][0]
		match = true
		for (let i = 0; i < size; i ++) {
			if (grid[i][i] != sample) {
				match = false
				break
			}
		}
		
		if (match) matches.push(sample)
		
		sample = grid[0][size - 1]
		match = true
		for (let i = size - 1; i >= 0; i --) {
			if (grid[i][i] != sample) {
				match = false
				break
			}
		}
		
		if (match) matches.push(sample)
		
		const winner = this._getWinner(matches)

		this._showWinner(winner)
	}
	
	private _getWinner(result: Array<number>): number {
		if (result.every(elem => elem === result[0])) {
			return result[0] ? result[0] : 0
		}
		else {
			return 0
		}
	}

	private _showWinner(winner): void {
		console.log(winner)
	}

	public static get instance(): GameManager {
    return GameManager._instance
  }

	public getGridSize(): number {
    return this.gridSize
  }

	set state(value) {
		this._state = value
		GameEventManager.onStateChange(this._state)
	}

	get state() {
		return this._state
	}
}


