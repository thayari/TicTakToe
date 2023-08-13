import { _decorator, Component, UITransform, Prefab } from 'cc';
import { GameManager } from './GameManager';
const { ccclass, property } = _decorator;

@ccclass('Grid')
export class Grid extends Component {
	@property ({ type: Prefab })
	protected cell: Prefab = null

	onLoad() {
		this._calculateCellSize()
	}
	
	private _calculateCellSize(): void {
		const numCells: number = GameManager.instance.gridSize
	
		const totalSize: number = this.getComponent(UITransform).width
	
		const cellSize: number = totalSize / numCells
		
		const cellUITransform: UITransform = this.cell.data.getComponent(UITransform)
	
		cellUITransform.width = cellSize
		cellUITransform.height = cellSize
	}
}
