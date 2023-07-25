import { _decorator, math, view, Enum, instantiate, Label, Node, Prefab, UITransform, Vec3 } from 'cc';
import { Screen } from './Screen';
import ScreenType from './ScreenType';
import { eventTarget, GameEvent, GameEventManager } from './GameEvents';
import { GameManager } from './GameManager';

const { ccclass, property } = _decorator;

const VALUES = 2

const playerTypes = Enum({
	'draw': 0,
	'X': 1,
	'O': 2
}) 

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

	start(): void {
		eventTarget.on(GameEvent.STATE_CHANGE, this._render, this)

		this._resizeLayout()

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
		else {
			this.grid.removeAllChildren()
			this._generateGrid()
		}
	}

	public updateWinnerLabel(value): void {
		this.winnerLabel.string = `Winner: ${playerTypes[value]}`
	}

	public onFillButtonClick(): void {
		this._generateGrid(true)
		GameEventManager.sendRandomizeToggle()
	}

	public onCheckButtonClick(): void {
		GameEventManager.sendCalculateToggle()
	}

	public onBackButtonClick(): void {
		GameManager.instance.state = null

		GameEventManager.sendSwitchScreen(ScreenType.MainMenu)
	}

	private _resizeLayout(): void {
		const winSize: math.Size = view.getVisibleSizeInPixel()
		const windowWidth: number = winSize.width
		const windowHeight: number = winSize.height

		if (windowHeight < windowWidth) {
			const gridHeight: number = this.grid.getComponent(UITransform).height

			if (gridHeight > windowHeight) {
				const scale = windowHeight / gridHeight - 0.3
				const vec3scale = new Vec3(scale, scale, 1)
				this.node.children.forEach(element => {
					element.setScale(vec3scale)
				})
			}
		}
	}
}


