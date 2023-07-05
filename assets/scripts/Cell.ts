import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Cell')
export class Cell extends Component {
    @property ({ type: Node })
	protected figure1: Node = null

    @property ({ type: Node })
	protected figure2: Node = null

    private _figureType: number

    public row: number
    public column: number

    start() {

    }

    update(random: number) {
        this._figureType = random
    }
}


