// import History from "./History";
// import { default as DOM } from "./DOMHelpers";

// export default class Action {

// 	// Create and return an HTML node with the given params
// 	static createNode(params) {
// 		let node = DOM.createNode(params);
// 		// History.register("add", node);
// 		return node;
// 	}

// 	static createFlexItem(params) {
// 		let item = DOM.createFlexItem(params);
// 		// History.register("add", item);
// 		return item;
// 	}

// 	// Insert the given node next to a target node.
// 	// if prepend evaluates to true, insert before the target.
// 	static insertNextTo(newNode, targetNode, prepend) {
// 		DOM.insertNextTo(newNode, targetNode, prepend);
// 		// History.register("insert", newNode );
// 	}

// 	static style(element, styles) {
// 		let currentStyle = DOM.getCurrentStyle(element, styles);
// 		// History.register("restyle", {element, currentStyle});
// 		DOM.style(element, styles);
// 	}

// 	static saveElementPosition(element) {
// 		element.oldParent = element.parentElement;
// 		element.oldSiblings = {
// 			next: element.nextElementSibling,
// 			previous: element.previousElementSibling
// 		}
// 	}

// }

// DOM.undo = {
// 	add: element => { console.log("removing element: "); console.log(element); element.remove() },
// 	restyle: ({element, oldStyles}) => {console.log("undoing styles, applying style"); console.log(oldStyles); DOM.style(element, oldStyles) },
// 	insert: element => { DOM.saveElementPosition(element) }
// }

// DOM.redo = {
// 	insert: element => { 
// 		let targetNode = element.oldSiblings.next;
// 		DOM.insertNextTo(element, targetNode); 
// 	}
// }