import { default as DOM } from "./DOMHelpers";
import Handle from "./Handle";

export default class SizingContainer {
	
	constructor({ container, horizontal = false }) {
		this.count = 0;
		this.items = [];
		this.handles = [];
		this.container = container;
		this.horizontal = horizontal;
		this.initContainer();
	}

	initContainer() {
		let item = this.getNewItem(1);
		this.listen(item);
		this.container.appendChild(item);
		this.incrementId();
	}

	getNewItem(grow) {
		this.count++;
		let id = `item${SizingContainer.ID}`;
		let item = DOM.createFlexItem({ id, grow, content: id });
		return item;
	}

	// Insert a flex item next to the clicked position
	insertFlexItem(clickEvent) {
		let item = this.getNewItem();
		let target = clickEvent.target;
		this.listen(item);
		DOM.insertNextTo(item, target, this.prepend)
		this.items.push(item);
	}

	// Insert a sizing handle at the clicked position 
	attachHandle(clickEvent) {
		let handle = new Handle({ 
			clickEvent: clickEvent,
			prepend: this.prepend,
			horizontal: this.horizontal
		});
		this.handles.push(handle);
	}

	listen(item) {
		item.addEventListener("click", e => this.onClick(e));
	}

	onClick(e) {
		let target = e.target;
		let targetSize = DOM.getSize(target, this.horizontal);
		let position = this.horizontal ? e.offsetY : e.offsetX;
		this.prepend = (position < targetSize / 2);
		this.insertFlexItem(e);
		this.attachHandle(e);
		this.incrementId();
	}

	incrementId() {
		++SizingContainer.ID;
	}
}

SizingContainer.ID = 0;

