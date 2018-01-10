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
		DOM.insertNextTo(this.node, target, prepend);
		this.updateSiblings();
		this.updateSizingArea();
		this.listen(this.node);
	}

	updateSiblings(e) {
		this.node = document.getElementById(this.node.id);
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
		App.registerEventListener(handle , "mousedown", e => this.onMouseDown(e));
		App.registerEventListener(document, "mousemove", e => this.onMouseMove(e));
		App.registerEventListener(document, "mouseup", e => this.onMouseUp(e));
	}

	onMouseDown(e) {
		e.stopPropagation();
		console.log("hey! :)")
		App.setValue("busy", true);
		this.updateSiblings();
		this.updateSizingArea();
		this.clicked = true;
		App.saveState();
	}

	onMouseUp(e) {
		if(this.clicked) {
			App.setValue("busy", false);
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
		let id = App.createId('handle');
		let cssClass = horizontal ? "handle--h" : "handle--v";
		let node = DOM.createNode({id, cssClass});
		return node;
	}

}
