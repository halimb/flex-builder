export default class AppState {

	constructor() {
		AppState.horizontal = { value: false, callbacks: [] };
	}

	static subscribe(state, onStateChange) {
		AppState[state].callbacks.push(onStateChange);
	}

	static set(state, value) {
		AppState[state].value = value;
		AppState.dispatch(state);
	}

	static dispatch(changedState) {
		let stateValue = AppState[changedState].value; 
		let callbacks = AppState[changedState].callbacks;
		callbacks.forEach( fn => fn(stateValue) );
	}
}

AppState.horizontal;
