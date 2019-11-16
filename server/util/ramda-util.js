const R = require('ramda')

const safePipe = R.pipeWith((f, res) =>
	R.isNil(res) || R.isEmpty(res) ? res : f(res),
)

const safePipeP = R.pipeWith((f, res) =>
	R.isNil(res) || R.isEmpty(res) ? res : Promise.resolve(res).then(f),
)

const then = (f, p) => p.then(f)
const pipeP = R.pipeWith(then)

module.exports = {
	pipeP,
	safePipe,
	safePipeP,
}
