export default class DOMHelpers {

	static getFlexGrow(item) {
		return parseFloat(item.style.flexGrow);
	}

	// Get the width or height of an html element
	static getSize(el, horizontal) {
		return horizontal ? el.offsetHeight : el.offsetWidth;
	}

	// Traverse the parents of an element and add up their offsets
	static getOffsetPos(item, top) {
		let parent = item.offsetParent;
		let offset = top ? "offsetTop" : "offsetLeft";
		if ( parent && parent !== document.body) {
			return this.getOffsetPos(parent, top) + item[offset];
		} else {
			return item[offset];
		}
	}

	static getOffsetTop(item) {
		return DOMHelpers.getOffsetPos(item, true);
	}

	static getOffsetLeft(item) {
		return DOMHelpers.getOffsetPos(item, false);
	}

	static logItemsGrow(items) {
		let c = 1;
		let log = "";
		items.forEach(
			i => log += `${c++} = ${this.getFlexGrow(i).toFixed(2)}, `);
		console.log(log);
	}

	static 	getDistance(a, b) {
		let [dx, dy] = [ b.x - a.x, b.y - a.y ];
		return Math.sqrt(dx**2 + dy**2);
	}

	// Create and return an HTML node with the given params
	static createNode({ 
			id, 
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

	// Return the styles of the element corresponding to those found in the given styles object 
	static getCurrentStyle(element, styles) {
		let current = {};
		for(const prop in styles) {
			let value = styles[prop];
			current[prop] = element.style[prop];
		}
		return current;
	}
}

