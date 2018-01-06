import { default as DOM } from  "./DOMHelpers";
import HoverBar from "./HoverBar";
export default class Handle {

	constructor( { clickEvent, prepend, horizontal } ) {
		this.clicked = false;
		this.horizontal = horizontal;
		this.node = Handle.createNode();
		this.initHandle(clickEvent, prepend);
		this.resize(clickEvent);
	}

	initHandle(clickEvent, prepend) {
		let target = clickEvent.target;
		DOM.insertNextTo(this.node, target, prepend);
		this.updateSiblings();
		this.updateSizingArea();
		this.listen(this.node);
	}

	updateSiblings() {
		this.nextItem = this.node.nextSibling;
		this.prevItem = this.node.previousSibling;
	}

	resize(e) {
		var position = this.getMousePosition(e);
		this.updateGrows(position);
	}

	getMousePosition(e) {
		var pagePos = this.horizontal ?
			e.pageY : e.pageX;
		let start = this.contextStart;
		let end = this.contextEnd;
		var pos = pagePos - start;
		if (pos > end) { pos = end }
		else if (pos < 0) { pos = 0 }
		return pos;
	}

	updateSizingArea() {
		let nextWidth = this.nextItem.offsetWidth
		let prevOffset = DOM.getOffsetPos(this.prevItem, this.horizontal);
		let nextOffset = DOM.getOffsetPos(this.nextItem, this.horizontal);
		this.contextStart = prevOffset;
		this.contextEnd = nextOffset + nextWidth - prevOffset;
	}

	updateGrows(pos) {
		let totalGrow = this.getTotalGrow();
		let totalSize = this.getTotalSize();
		var prevItemGrow = parseFloat(totalGrow * pos / totalSize).toFixed(3);
		var nextItemGrow = totalGrow - prevItemGrow;
		this.nextItem.style.flex = nextItemGrow;
		this.prevItem.style.flex = prevItemGrow;
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
		e.preventDefault();
		this.updateSiblings();
		this.updateSizingArea();
		this.clicked = true;
	}

	onMouseUp(e) {
		// e.preventDefault();
		this.clicked = false;
	}

	onMouseMove(e) {
		if (this.clicked) {
			e.preventDefault();
			this.resize(e);
		}
	}

	static createNode() {
		let id = `handle${++Handle.ID}`
		let node = DOM.createNode({id, cssClass: "handle"});
		DOM.style(node, {cursor: "col-resize"});
		return node;
	}

}

Handle.ID = 0;
