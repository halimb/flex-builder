import Action from "./Action";

export default class History {
	
	constructor() {
		this.index = 0;
		this.actions = [];
		this.checkpoints = [];
	}

	register(action, params) {
		this.actions.push( { action, params} );
	}

	addCheckpoint() {
		let checkpoint = this.actions;
		this.checkpoints.push(checkpoint);
		this.actions = [];
		this.index++;
		console.log(this.checkpoints);
	}

	undo() {
		if (this.index == 0) { return };
		let lastState = this.checkpoints[this.index - 1];
		let len = lastState.length;
		for (let i = len - 1; i >= 0; i--) {
			let event = lastState[i];
			Action.undo[event.action](event.params); 
		}
		this.index--;
	}
}
