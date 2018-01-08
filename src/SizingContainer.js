import { default as DOM } from "./DOMHelpers";
import Action from "./Action";
import AppHistory from "./AppHistory";
import AppState from "./AppState";
import Handle from "./Handle";

export default class SizingContainer {
	
	constructor({ container, horizontal = false, initialSetup = null }) {
		this.count = 0;
		this.items = [];
		this.handles = [];
		this.container = container;
		this.horizontal = horizontal;
		this.id = this.createContainerId();
		this.initialSetup = initialSetup;
		this.initContainer();
		AppHistory.addCheckpoint();
	}

	initContainer() {
		let item = this.getNewItem(1);
		this.container.innerHTML = "";
		this.container.id = `container-${this.id}`;
		this.container.appendChild(item);
		this.listen(item);
		this.styleContainer();

		if(this.initialSetup) {
			this.setup();
		}
	}

	styleContainer() {
		let className = this.horizontal ? "--column" : "--row";
		this.container.className += className;
	}

	getNewItem(grow) {
		this.count++;
		let id = this.createItemId();
		let item = Action.createFlexItem({ id, grow, content: id });
		this.items.push(item);
		return item;
	}

	// Insert a flex item next to the clicked position
	insertFlexItem(target) {
		let item = this.getNewItem();
		this.listen(item);
		 Action.insertNextTo(item, target, this.prepend)
	}

	// Insert a sizing handle at the clicked position 
	attachHandle(target, initialPos) {
		let handle = new Handle({ 
			target,
			initialPos,
			prepend: this.prepend,
			horizontal: this.horizontal
		});
		this.handles.push(handle);
	}

	listen(item) {
		item.addEventListener("mousedown", e => this.onMouseDown(e));
		item.addEventListener("click", e => {
			if (this.validateClick(e)) { 
				this.onClick(e);
			}
		});
	}

	validateClick(e) {
		let newPos = {x: e.pageX, y: e.pageY};
		let oldPos = SizingContainer.clickPosStart;
		let distance = DOM.getDistance(oldPos, newPos)
		return (distance < 10 && ! AppState.get("busy"));
	}

	setup() {
		let config = this.initialSetup;
		let target = this.items[0];
		let targetSize = DOM.getSize(target, this.horizontal);
		this.prepend = (config.offset > targetSize / 2);
		this.insertFlexItem(target);
		this.attachHandle(target, config.raw);
	}

	onMouseDown(e) {
		SizingContainer.clickPosStart = {x: e.pageX, y: e.pageY};
	}

	onClick(e) {
		e.stopPropagation();

		let rawPos = {x: e.pageX, y: e.pageY};
		let offsetPos = appHorizontal ? e.offsetY : e.offsetX;
		
		let target = e.target;
		let targetSize = DOM.getSize(target, appHorizontal);

		let appHorizontal = AppState.get("horizontal");
		let newOrientation = this.horizontal != appHorizontal;

		if (newOrientation) {
			return new SizingContainer({
				container: target,
				horizontal: appHorizontal,
				initialSetup: { raw: rawPos, offset: offsetPos }
			});
		}

		this.prepend = (offsetPos < targetSize / 2);
		this.insertFlexItem(target);
		this.attachHandle(target, rawPos);
	}

	createItemId() {
		let itemId = this.count;
		// itemId = (itemId < 10) ? ("0" + itemId) : (itemId);
		let containerId = this.id; 
		return `${containerId}${itemId}`;
	}

	removeListeners(item) {
		item.removeEventListener(this.onClick);
	}

	createContainerId() {
		return String.fromCharCode(++SizingContainer.ID);
	}
}

SizingContainer.clickPosStart;
SizingContainer.ID = 64;

