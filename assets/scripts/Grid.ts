import { _decorator, Component, Node, Prefab } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Grid')
export class Grid extends Component {
    @property ({ type: Prefab })
    protected cell: Prefab = null
}
