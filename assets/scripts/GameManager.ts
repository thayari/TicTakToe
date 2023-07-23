import { _decorator, CCInteger, Component, instantiate, Node, Prefab } from 'cc';
import { Screen } from './Screen';
import ScreenType from './ScreenType';
import { eventTarget, GameEvent, GameEventManager } from './GameEvents';
import { GameFieldScreen } from './GameFieldScreen';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
	@property({ type: Node })
	protected rootNode: Node = null;

	@property({ type: Prefab, group: { name: 'Screens' } })
	protected uiScreens: Prefab[] = [];

	@property({ type: CCInteger })
	public gridSize: number = 3

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
		
		// Helper function to check if all elements in an array are the same
		const allElementsMatch = (arr: number[]): boolean => arr.every((item) => item === arr[0])
		
		// Check rows
		for (let k = 0; k < size; k++) {
			if (allElementsMatch(grid[k])) {
				matches.push(grid[k][0])
			}
		}
		
		// Check columns
		for (let k = 0; k < size; k++) {
			const column = grid.map(row => row[k]);
			if (allElementsMatch(column)) {
				matches.push(column[0])
			}
		}
		
		// Check main diagonal
		const mainDiagonal = grid.map((row, i) => row[i]);
		if (allElementsMatch(mainDiagonal)) {
			matches.push(mainDiagonal[0])
		}
		
		// Check secondary diagonal
		const secondaryDiagonal = grid.map((row, i) => row[size - 1 - i]);
		if (allElementsMatch(secondaryDiagonal)) {
			matches.push(secondaryDiagonal[0])
		}
		
		const winner = this._getWinner(matches);
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
		const gameField: Node = this._screensMap.get(ScreenType.GameField)

		gameField.getComponent(GameFieldScreen).updateWinnerLabel(winner)
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


