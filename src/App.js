import History from "./History";
import HoverBar from "./HoverBar";
import {default as DOM} from "./DOMHelpers";

export default class App {

	static init(container) {
        document.addEventListener("keyup", e => App.onKeyUp(e));
		document.addEventListener("keydown", e => App.onKeyDown(e));
        document.addEventListener("mousedown", e => App.onMouseDown(e));
	}

	static subscribe(state, onStateChange) {
		console.log(state)
		if (App[state] === undefined) { App[state] = { value: null, callbacks: [] } }
		App[state].callbacks.push(onStateChange);
	}

	static setValue(state, value) {
		App[state].value = value;
		App.dispatch(state);
	}

	static getValue(state) {
		return App[state].value;
	}

	static dispatch(changedState) {
		let stateValue = App[changedState].value; 
		let callbacks = App[changedState].callbacks;
		callbacks.forEach( fn => fn(stateValue) );
	}

	static registerEventListener(element, eventType, handler) {
		element.addEventListener(eventType, handler);
		App.listeners.push({element, eventType, handler});
	}

	static saveState() {
		let clone = App.container.cloneNode(true);
		let count = { handle: App.count.handle, context: App.count.context }
		let snapshot = { DOM: clone, count, listeners: App.listeners};
		App.history.addCheckpoint(snapshot);
		App.setValue("backHistory", true);
	}

	static createId(type, params=null) {
        switch (type) {

			case "context": {
				let charCode = App.count.context++;
				return String.fromCharCode(charCode);
            }

            case "handle": {
                return `handle-${++App.count.handle}`;
            }
            
            case "item": {

            }
        }
	}

	static onMouseDown(e) {
		App.clickPosStart = {x: e.pageX, y: e.pageY}
	}

	static onKeyDown(e) {
		let key = e.key;
		let ctrl = e.ctrlKey;
		switch (key) {
			case "z":
			case "Z": {
				if (ctrl) { App.undo() }
				break;
			}
			case "Control": {
				App.setValue("horizontal", (e.key === "Control"));
				break
			}
		}
	}

	static onKeyUp(e) {
		App.setValue("horizontal", false)
	}

    static validateClick(e) {
        let appIsFree = ! App.busy.value;
        let newPos = {x: e.pageX, y: e.pageY};
        let oldPos = App.clickPosStart;
        let distance = DOM.getDistance(oldPos, newPos);
        return (distance < 10 && appIsFree);
    }

    static undo() {
    	let prevState = App.history.getAnteriorState();
		if (prevState) {
			let { DOM, count, listeners } = prevState;
		 	App.applyDOMSnapshot(DOM);
		 	App.applyCount(count)
		 	App.attachListeners(listeners);
		 	App.forwardHistory = true;
		} else {
			App.setValue("backHistory", false);
		}
    }

    static applyDOMSnapshot(DOMSnapshot) {
		let parent = App.container.parentElement;
		parent.replaceChild(DOMSnapshot, App.container);
		App.container = DOMSnapshot;
	}

	static applyCount(count) {
		console.log(count);
		App.count = count;
	}

	static attachListeners(listeners) {
		listeners.forEach( l => {
			let {element, eventType, handler} = l;
			let id = element.id;
			element = document.getElementById(id);
			element && element.addEventListener(eventType, handler);
		});
		App.listeners = listeners;
	}
}


App.listeners = [];
App.container = container;
App.history = new History();
App.clickPosStart = {x: 0, y: 0};
App.count = { handle: 0, context: 65 };
App.hoverBar = new HoverBar({ container: container.parentElement, thickness: 5 });
