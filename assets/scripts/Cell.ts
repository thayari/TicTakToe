import { _decorator, Component, Node, tween, UIOpacity } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Cell')
export class Cell extends Component {
	@property ({ type: Node })
	protected figures: Node[] = []

	updateValue(value: number) {
		if (value > 0) {
			const figure = this.figures[value - 1]

			figure.active = true
			figure.getComponent(UIOpacity).opacity = 255
		}
	}
}