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
		if ( parent && parent != document.body) {
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
}

