import History from "./History";
import HoverBar from "./HoverBar";
import SizingContainer from "./SizingContainer";

export default class App {

	static init(container) {
		App.container = container; 
		App.hoverBar = new HoverBar({ container, thickness: 5 });
		document.addEventListener("keydown", e => { App.set("horizontal", (e.key == "Control")) });
		document.addEventListener("keyup", e => { App.set("horizontal", false) });
	}

	static subscribe(state, onStateChange) {
		if (App.horizontal == undefined) { App[state] = { callbacks: [] } };
		App[state].callbacks.push(onStateChange);
	}

	static set(state, value) {
		App[state].value = value;
		App.dispatch(state);
	}

	static get(state) {
		return App[state].value;
	}

	static dispatch(changedState) {
		let stateValue = App[changedState].value; 
		let callbacks = App[changedState].callbacks;
		callbacks.forEach( fn => fn(stateValue) );
	}

	static saveState() {

	}
}

App.horizontal = { value: false, callbacks: [] };
App.busy = { value: false, callbacks: [] }
