export default class DOMHelpers {

	static getFlexGrow(item) {
		return parseFloat(item.style.flexGrow);
	}

	// Get the width or height of an html element
	static getSize(el, horizontal) {
		return horizontal ? el.clientHeight : el.clientWidth;
	}

	// Traverse the parents of an element and add up their offsets
	static getOffsetPos(item, horizontal) {
		let parent = item.offsetParent;
		let offset = horizontal ? "offsetTop" : "offsetLeft";
		if ( parent && parent != document.body) {
			return this.getOffsetPos(parent, horizontal) + item[offset];
		} else {
			return item[offset];
		}
	}

	static logItemsGrow(items) {
		let c = 1;
		let log = "";
		items.forEach(
			i => log += `${c++} = ${this.getFlexGrow(i).toFixed(2)}, `);
		console.log(log);
	}

	// Create and return an HTML node with the given params
	static createNode(
		{ 
			id = ++DOMHelpers.ID, 
			content = "", 
			cssClass = "", 
			tag = "div" 
		}) {
		let node = document.createElement(tag);
		node.id = id;
		node.innerHTML = content;
		node.className = cssClass;
		return node;	
	}

	static createFlexItem({ id, content = "", grow = 0, cssClass = "item"}) {
		let item = this.createNode({id, content, cssClass});
		item.style.flexGrow = grow;
		return item;
	}

	// Insert the given node next to a target node.
	// if prepend evaluates to true, insert before the target.
	static insertNextTo(newNode, targetNode, prepend) {
		let parent = targetNode.parentNode;
		let nextElement = prepend ? targetNode : targetNode.nextElementSibling;
		parent.insertBefore(newNode, nextElement);
	}

	
	static style(element, styles) {
		for(var property in styles) {
			element.style[property] = styles[property];
		}
	}

}

DOMHelpers.ID = 0;

