module.exports = {
	presets: [
		[
			'@babel/preset-env',
			{
				loose: true,
				bugfixes: true,
				shippedProposals: true,

				// Why are we setting these? WELL, useBuiltIns does two things:
				//
				// - Adds corejs polyfills for detected features
				// - Uses native API's for runtime (helper) code
				//
				// We want the latter behavior so that things like `_extends` aren't added to the
				// code when Object.assign is supported for all browsers. HOWEVER, we DO NOT
				// want preset-env to include polyfills for these, that is handled by polyfill-corejs3
				corejs: 3,
				useBuiltIns: 'usage',
				exclude: [/^(es|es6|es7|esnext|web)\./],
			},
		],
		'@babel/react',
	],
	plugins: [
		[
			'polyfill-corejs3',
			{
				method: 'usage-global',
				version: '3.8.0',
			},
		],
	],
}
