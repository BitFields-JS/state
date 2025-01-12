// object orientated version
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

// functional version
function state(initial) {
	let state = initial;

	const middleware = {
		before: [],
		after: []
	};

	function _get() {
		return typeof state === 'function' ? state() : state;
	}

	function _set(newState) {
		middleware.before.forEach((fn) => fn(state, newState));

		state = typeof newState === 'function' ? newState(state) : newState;

		middleware.after.forEach((fn) => fn(state));
	}

	function addMiddleware(type, fn) {
		if (type === 'before') middleware.before.push(fn);
		if (type === 'after') middleware.after.push(fn);
	}

	return {
		get: _get,
		set: _set,
		addMiddleware
	};
}

/*
function exampleFunctional() {
	let [x, setX] = state(10);
	console.log(x());
	setX(20);
	console.log(x());

	let [y, setY] = state(() => Math.random() * 100);
	console.log(y());
	setY(() => () => 123.456);
	console.log(y());
}

function exampleObjectOrientated() {
	let x = new State(10);
	console.log(x.get());
	x.set(20);
	console.log(x.get());	
}

function main() {
	exampleFunctional();
	console.log();
	exampleObjectOrientated();
}

main();
*/
