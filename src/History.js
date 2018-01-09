export default class History {
	
	constructor() {
		this.index = -1;
		this.checkpoints = [];
	}

	addCheckpoint(snapshot) {
		this.checkpoints.push(snapshot);
		this.index++;
	}

	getAnteriorState() {
		if (this.index == 0) { 
			console.log("App history reached the initial state."); 
			return false
		};
		let snapshot = this.checkpoints[this.index--];
		return snapshot;
	}
}
