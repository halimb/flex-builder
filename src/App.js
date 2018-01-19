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
		if (App.state[state] === undefined) { App.state[state] = { value: null, callbacks: [] } }
		App.state[state].callbacks.push(onStateChange);
	}

	static setState(stateName, value) {
		App.state[stateName].value = value;
		App.dispatch(stateName);
	}

	static getState(stateName) {
		return App.state[stateName].value;
	}

	static dispatch(changedState) {
		let stateValue = App.state[changedState].value;
		let callbacks = App.state[changedState].callbacks;
		callbacks.forEach( fn => fn(stateValue) );
	}

	static saveSnapshot() {
		let clone = App.container.cloneNode(true);
		let count = Object.assign({}, App.itemsCount);//{ handle: App.itemsCount.handle, context: App.itemsCount.context };
		let snapshot = { DOM: clone, itemsCount: count, listeners: App.listeners};
		App.history.addCheckpoint(snapshot);
		App.setState("hasBackHistory", true);
	}

	static createId(type, params=null) {
        switch (type) {

			case "context": {
				let charCode = 65 + App.itemsCount.context++;
				return String.fromCharCode(charCode);
            }

            case "handle": {
                return `handle-${++App.itemsCount.handle}`;
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
				App.setState("horizontal", true);
				break
			}
		}
	}

	static onKeyUp(e) {
		App.setState("horizontal", false)
	}

    static validateClick(e) {
        let appIsFree = ! App.getState("busy");
        let newPos = {x: e.pageX, y: e.pageY};
        let oldPos = App.clickPosStart;
        let distance = DOM.getDistance(oldPos, newPos);
        return (distance < 10 && appIsFree);
    }

    static undo() {
    	let prevState = App.history.getAnteriorState();
		if (prevState) {
			let { DOM, itemsCount, listeners } = prevState;
		 	App.applyDOMSnapshot(DOM);
		 	App.applyCount(itemsCount);
		 	window.setTimeout(()=>App.attachListeners(listeners), 500);
		 	App.setState("hasForwardHistory", true);
		} else {
			App.setState("hasBackHistory", false);
		}
		console.log([App]);
    }

    static applyDOMSnapshot(DOMSnapshot) {
		let parent = App.container.parentElement;
		parent.replaceChild(DOMSnapshot, App.container);
		App.container = DOMSnapshot;
	}

	static applyCount(count) {
		App.itemsCount = count;
	}

    static registerEventListener(element, eventType, callback) {
        element.addEventListener(eventType, callback);
        App.listeners.push({targetId: element.id, eventType, callback});
    }

	static attachListeners(listeners) {
		listeners.forEach( l => {
			let {targetId, eventType, callback} = l;
			let target = document.getElementById(targetId);
			if(target) {
				target.addEventListener(eventType, callback);
			}
		});
		App.listeners = listeners;
	}
}

App.state = {
    horizontal: { value: null, callbacks: [] },
    hasBackHistory: { value: null, callbacks: [] },
    hasForwardHistory: { value: null, callbacks: [] }
};
App.listeners = [];
App.container = container;
App.history = new History();
App.clickPosStart = {x: 0, y: 0};
App.itemsCount = { handle: 0, context: 0 };
App.hoverBar = new HoverBar({ container: container.parentElement, thickness: 5 });
