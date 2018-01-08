import AppHistory from "./AppHistory";

export default class Action {

	// Create and return an HTML node with the given params
	static createNode({ 
			id, 
			content = "", 
			cssClass = "", 
			tag = "div" 
		}, omit) {
		let node = document.createElement(tag);
		node.id = id;
		node.innerHTML = content;
		node.className = cssClass;
		if (!omit) { AppHistory.register("add", node); }
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
		AppHistory.register("insert", {parent, newNode, nextElement});
	}

	static style(element, styles, omit) {

		for(var property in styles) {
			element.style[property] = styles[property];
		}
		if (omit) { return }
		AppHistory.register("restyle", {element, styles});
	}
}

Action.add = {
	undo: element => { console.log("removing element: "); console.log(element); element.remove() },
	redo: element => {  }     
}

Action.insert = {
	undo: ({element, styles}) => {},
	redo: () => {}
}

Action.restyle = {
	undo: () => {},
	redo: () => {}
}