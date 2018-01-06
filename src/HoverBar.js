import { default as DOM } from "./DOMHelpers";

export default class HoverBar {

	constructor({container, thickness}) {
		this.thickness = thickness;
		this.container = container;
		this.visible = true;
		this.clicked = false;
		this.bar = DOM.createNode({
			id: "hoverbar",
			cssClass: "hoverbar"
		});
		this.attachBar(container);
	}

	attachBar(container) {
		container.appendChild(this.bar);
		container.addEventListener("mousemove", e => this.onMouseMove(e));
		container.addEventListener("mouseleave", e => this.disable());
		container.addEventListener("mouseenter", e => this.enable());
		container.addEventListener("mousedown", e => this.disable(true));
		container.addEventListener("mouseup", e => this.enable(true));
	}

	onMouseMove(e) {
		if(this.visible) {
			let target = e.target;
			if(target.id == this.ID) {
				target = e.path[1];
			}
			let mousePos = this.getMousePos(e);
			let horizontal = this.isHorizontal();
			this.updateBar( mousePos, target, horizontal);
		}
	}

	isHorizontal() {	
		return false;
	}

	getMousePos(e) {
		return {
			x: e.pageX,
			y: e.pageY
		}
	}

	updateBar(mousePos, target, horizontal) {
		let containerTop = 0;//DOM.getOffsetPos(this.container, true);
		let containerLeft = DOM.getOffsetPos(this.container, false);
		let hoverX = mousePos.x - containerLeft;
		let hoverY = mousePos.y - containerTop;

		let [width, height] = horizontal ? 
				[target.offsetWidth, this.thickness] :
				[this.thickness, target.offsetHeight];
		
		let [left, top] = horizontal ?
				[containerLeft, hoverY] :
				[hoverX, containerTop];

		let styles = { top, left, width, height };

		DOM.style(this.bar, styles);
	}

	enable(mouseup) {
		if (mouseup) { this.clicked = false };
		if (this.clicked) {
			return;
		}
		this.visible = true;
		DOM.style(this.bar, {opacity: "1"});
	}

	disable(mousedown) {
		this.visible = false;
		DOM.style(this.bar, {opacity: "0"});
		if (mousedown) { this.clicked = true };
	}

}