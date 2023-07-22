import { _decorator, Component, instantiate, Label, Node, Prefab } from 'cc';
import { Screen } from './Screen';
import ScreenType from './ScreenType';
import { eventTarget, GameEvent, GameEventManager } from './GameEvents';
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

	@property ({ type: Prefab })
	protected cell = null

	@property ({ type: Label })
	protected winnerLabel = null

	private state: Array<Array<number>> | null = null

	start(): void {
		eventTarget.on(GameEvent.STATE_CHANGE, this._render, this)

		this._generateGrid()
	}

	private _generateGrid(randomise = false): void {
		const size: number = GameManager.instance.gridSize

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

		GameManager.instance.state = grid
	}

	private _render() {
		const state = GameManager.instance.state

		if (state) {
			this.grid.removeAllChildren()
			const values = state.flat()

			values.forEach(cellValue => {
				const cellNode = instantiate(this.cell)

				cellNode.parent = this.grid

				cellNode.getComponent('Cell').updateValue(cellValue)
			})
		}
	}

	public updateWinnerLabel(value): void {
		this.winnerLabel.string = `Winner: ${value}`
	}

	public onFillButtonClick(): void {
		this._generateGrid(true)
		GameEventManager.sendRandomizeToggle()
	}

	public onCheckButtonClick(): void {
		GameEventManager.sendCalculateToggle()
	}

	public onBackButtonClick(): void {
		GameEventManager.sendSwitchScreen(ScreenType.MainMenu)
	}
}


