import { default as DOM } from "./DOMHelpers";
import App from "./App";

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
		// container.addEventListener("mousedown", e => this.disable(true));
		// container.addEventListener("mouseup", e => this.enable(true));
		App.subscribe("busy", b => this.onAppBusy(b) )
		App.subscribe("horizontal", value => this.updateOrientation(value));
	}

	onMouseMove(e) {
		this.updateTarget(e);
		this.updatePosition(e);
		this.renderBar();
	}

	updateTarget(e) {
		let target = e.target;
		if(target.id == this.ID) {
			target = e.path[1];
		}
		this.target = target; 
	}

	updatePosition(e) {
		this.x = e.pageX - this.thickness / 2;
		this.y = e.pageY;
	}

	renderBar() {
		if (this.visible) {
			let containerTop = DOM.getOffsetTop(this.container);
			let containerLeft = DOM.getOffsetLeft(this.container);
			let targetLeft = DOM.getOffsetLeft(this.target) - containerLeft;
			let targetTop = DOM.getOffsetTop(this.target) - containerTop;
			let hoverX = this.x - containerLeft;
			let hoverY = this.y - containerTop;

			let [width, height] = this.horizontal ? 
					[this.target.offsetWidth, this.thickness] :
					[this.thickness, this.target.offsetHeight];
			
			let [left, top] = this.horizontal ?
					[targetLeft, hoverY] :
					[hoverX, targetTop];

			let styles = { top, left, width, height };

			 DOM.style(this.bar, styles);
		}
	}

	updateOrientation(value) {
		this.horizontal = value;
		this.renderBar();
	}

	enable() {
		this.visible = true;
		 DOM.style(this.bar, {opacity: "1"});
	}

	disable() {
		this.visible = false;
		 DOM.style(this.bar, {opacity: "0"});
	}

	onAppBusy(appBusy) {
		if (appBusy) { this.disable() }
		else { this.enable() } 
	}

}