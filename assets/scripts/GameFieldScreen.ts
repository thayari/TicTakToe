import { _decorator, Component, Node } from 'cc';
import { Screen } from './Screen';
import ScreenType from './ScreenType';
import { GameEventManager } from './GameEvents';
import { GameManager } from './GameManager';

const { ccclass, property } = _decorator;

const VALUES = 2

@ccclass('GameFieldScreen')
export class GameFieldScreen extends Screen {
	@property ({ type: ScreenType, override: true })
	public screenType = ScreenType.GameField

	@property ({ type: Node })
	protected fillButton = null

	@property ({ type: Node })
	protected checkButton = null

	@property ({ type: Node })
	protected backButton = null

	@property ({ type: Node })
	protected grid = null

	@property ({ type: Node })
	protected cell = null

	private state: Array<Array<number>> | null = null

	start() {
		const gridSize: number = GameManager.instance.gridSize

		this.state = this._generateGrid(gridSize)
	}

	private _generateGrid(size, randomise = false): Array<Array<number>> {
		const grid = []

		for (let i = 0; i < size; i++) {
			const row = []
			
			for (let j = 0; j < size; j++) {
				let value = 0
				
				if (randomise) {
					value = Math.floor(Math.random() * VALUES + 1) 
				}
				row.push(value)
			}
	
			grid.push(row)
		}
		
		return grid
	}

	private _render() {
		if (this.state) {
			const values = this.state.flat()


		}
	}

	onFillButtonClick(): void {
		GameEventManager.sendRandomizeToggle()
	}

	onCheckButtonClick(): void {
		GameEventManager.sendCalculateToggle()
	}

	onBackButtonClick(): void {
		GameEventManager.sendSwitchScreen(ScreenType.MainMenu)
	}
}


