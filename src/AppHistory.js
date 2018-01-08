import Action from "./Action";

export default class AppHistory {
	static register(action, params) {
		AppHistory.actions.push( { action, params} );
	}

	static addCheckpoint() {
		let checkpoint = AppHistory.actions;
		AppHistory.checkpoints.push(checkpoint);
		AppHistory.actions = [];
		AppHistory.index++;
	}

	static undo() {
		if (AppHistory.index == 1) { return };
		let lastState = AppHistory.checkpoints[AppHistory.index - 1];
		let len = lastState.length;
		for (let i = len - 1; i >= 0; i--) {
			let event = lastState[i];
			Action[event.action].undo(event.params) 
		}
		AppHistory.index--;
	}
}

AppHistory.index = 0;
AppHistory.actions = [];
AppHistory.checkpoints = [];