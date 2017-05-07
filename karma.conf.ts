module.exports = function (config) {
	config.set({
		frameworks: [
			'karma-typescript',
			'jasmine',
		],
		files: [
			{pattern: 'test/**/*.spec.ts'},
		],
		preprocessors: {
			'**/*.ts': ['karma-typescript'],
		},
		reporters: ['progress', 'karma-typescript'],
		browsers: ['PhantomJS'],
	});
};