import { default as DOM } from "./DOMHelpers";
import Action from "./Action";
import App from "./App";
import Handle from "./Handle";

export default class SizingContext {
	
	constructor({ container, horizontal = false, initialSetup = null }) {
		this.items = [];
		this.handles = [];
		this.itemCount = 0;
		this.container = container;
		this.horizontal = horizontal;
		this.id = App.createId("context");
		this.initialSetup = initialSetup;
		this.initContainer();
	}

	initContainer() {
		let item = this.getNewItem(1);
		this.container.innerHTML = "";
		this.container.id = this.id;
		this.container.appendChild(item);
		this.listen(item);
		this.styleContainer();

		if(this.initialSetup) {
			this.setup();
		}
	}

	styleContainer() {
		this.container.className += this.horizontal ? "--column" : "--row";
	}

	getNewItem(grow) {
		this.itemCount++;
		let id = this.id + this.itemCount;
		let item = DOM.createFlexItem({ id, grow, content: id });
		this.items.push(item);
		return item;
	}

	// Insert a flex item next to the clicked position
	insertFlexItem(target) {
		let item = this.getNewItem();
		this.listen(item);
		DOM.insertNextTo(item, target, this.prepend)
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
		let callback = e => {
			if (App.validateClick(e)) {
				this.onClick(e);
			}
		}
		App.registerEventListener(item, "click", callback);
	}

	setup() {
		let config = this.initialSetup;
		let target = this.items[0];
		let targetSize = DOM.getSize(target, this.horizontal);
		this.prepend = (config.offset > targetSize / 2);
		this.insertFlexItem(target);
		this.attachHandle(target, config.raw);
	}

	onClick(e) {
		e.stopPropagation();
		let rawPos = {x: e.pageX, y: e.pageY};
		let offsetPos = appHorizontal ? e.offsetY : e.offsetX;
		
		let target = e.target;
		let targetSize = DOM.getSize(target, appHorizontal);

		let appHorizontal = App.getState("horizontal");
		let newOrientation = this.horizontal !== appHorizontal;

		if (newOrientation) {
			App.saveSnapshot();
			return new SizingContext({
				container: target,
				horizontal: appHorizontal,
				initialSetup: { raw: rawPos, offset: offsetPos }
			});
		}

		App.saveSnapshot();
		this.prepend = (offsetPos < targetSize / 2);
		this.insertFlexItem(target);
		this.attachHandle(target, rawPos);
	}

	// removeListeners(item) {
	// 	item.removeEventListener(this.onClick);
	// }

}