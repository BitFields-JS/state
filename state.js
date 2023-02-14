class State {
	constructor(initialState, init) {
		this.state = initialState;
		if (typeof init === 'function') {
			init();
		}
	}

	get() {
		return this.state;
	}

	set(newState, before, after) {
		if (typeof before === 'function') {
			before(newState);
		}

		this.state = newState;

		if (typeof after === 'function') {
			after(newState);
		}
	}
}
