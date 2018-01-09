import { default as DOM } from  "./DOMHelpers";
import Action from "./Action";
import App from "./App";
import HoverBar from "./HoverBar";

export default class Handle {

	constructor( { target, initialPos = {x: NaN, y: NaN}, prepend, horizontal } ) {
		this.horizontal = horizontal;
		this.node = Handle.createNode(horizontal);
		this.initHandle(target, prepend);
		let position = this.processPosition({
			x: initialPos.x, 
			y: initialPos.y
		});
		this.resizeTo(position);
		this.clicked = false;
	}

	initHandle(target, prepend) {
		Action.insertNextTo(this.node, target, prepend);
		this.updateSiblings();
		this.updateSizingArea();
		this.listen(this.node);
		// App.saveState();
	}

	updateSiblings(e) {
		this.nextItem = this.node.nextSibling;
		this.prevItem = this.node.previousSibling;
	}

	resizeTo(position) {
		this.updateGrows(position);
	}

	processPosition({x, y}) {
		var pagePos = this.horizontal ? y : x;
		let start = this.contextStart;
		let end = this.contextEnd;
		var pos = pagePos - start;
		if (pos > end) { pos = end }
		else if (pos < 0) { pos = 0 }
		return pos;
	}

	updateSizingArea() {
		let nextSize = DOM.getSize(this.nextItem, this.horizontal);
		let prevOffset = DOM.getOffsetPos(this.prevItem, this.horizontal);
		let nextOffset = DOM.getOffsetPos(this.nextItem, this.horizontal);
		this.contextStart = prevOffset;
		this.contextEnd = nextOffset + nextSize - prevOffset;
	}

	updateGrows(pos) {
		let totalGrow = this.getTotalGrow();
		let totalSize = this.getTotalSize();
		var prevItemGrow = parseFloat(totalGrow * pos / totalSize).toFixed(3);
		var nextItemGrow = totalGrow - prevItemGrow;
		DOM.style(this.nextItem, { flex: nextItemGrow });
		DOM.style(this.prevItem, { flex: prevItemGrow });
	}
	
	getTotalSize() {
		let d1 = DOM.getSize(this.nextItem, this.horizontal);
		let d2 = DOM.getSize(this.prevItem, this.horizontal);
		return d1 + d2;
	}

	getTotalGrow() {
		let g1 = DOM.getFlexGrow(this.nextItem);
		let g2 = DOM.getFlexGrow(this.prevItem);
		return g1 + g2;
	}

	listen(handle) {
		handle.addEventListener("mousedown", e => this.onMouseDown(e));
		document.addEventListener("mousemove", e => this.onMouseMove(e));
		document.addEventListener("mouseup", e => this.onMouseUp(e));
	}

	onMouseDown(e) {
		e.stopPropagation();
		this.registerStyle();
		// App.saveState();
		App.set("busy", true);
		this.updateSiblings();
		this.updateSizingArea();
		this.clicked = true;
	}

	onMouseUp(e) {
		// e.preventDefault();
		// if (this.clicked) {
			App.set("busy", false);
			this.clicked = false;
		// }
	}

	onMouseMove(e) {
		if (this.clicked) {
			e.stopPropagation();
			let position = this.processPosition({
				x: e.pageX,
				y: e.pageY
			})
			this.resizeTo(position);
		}
	}

	registerStyle() {
		let nextItemGrow = this.nextItem.style.flex;
		let prevItemGrow = this.prevItem.style.flex;
		let styleNext = { "flex": nextItemGrow };
		let stylePrev = { "flex": prevItemGrow };
		Action.style(this.nextItem, styleNext);
		Action.style(this.prevItem, stylePrev);
	}

	static createNode(horizontal) {
		let id = `handle${++Handle.ID}`
		let cssClass = horizontal ? "handle--h" : "handle--v";
		let node = Action.createNode({id, cssClass});
		return node;
	}

}

Handle.ID = 0;
