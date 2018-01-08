import { default as DOM } from  "./DOMHelpers";
import Action from "./Action";
import AppHistory from "./AppHistory";
import AppState from "./AppState";
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
		console.log(initialPos);
		console.log(position);
		this.resizeTo(position);
		this.clicked = false;
	}

	initHandle(target, prepend) {
		Action.insertNextTo(this.node, target, prepend);
		this.updateSiblings();
		this.updateSizingArea();
		this.listen(this.node);
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
		console.log(`contextStart = ${start}, contextEnd = ${end}, pos = ${pos}`);
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
		console.log(`nextOffset = ${nextOffset}, nextSize = ${nextSize}, prevOffset = ${prevOffset}`);
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
		e.stopPropagation();
		AppState.set("busy", true);
		this.updateSiblings();
		this.updateSizingArea();
		this.clicked = true;
	}

	onMouseUp(e) {
		// e.preventDefault();
		if (this.clicked) {
			AppState.set("busy", false)
			AppHistory.addCheckpoint();
			this.clicked = false;
		}
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

	static createNode(horizontal) {
		let id = `handle${++Handle.ID}`
		let cssClass = horizontal ? "handle--h" : "handle--v";
		let node = Action.createNode({id, cssClass});
		return node;
	}

}

Handle.ID = 0;
