module.exports = function (config) {
	config.set({
		frameworks: ["jasmine", "karma-typescript"],
		files: [
			{pattern: "tests/**/*.ts"},
			{pattern: "lib/**/*.ts"},
		],
		preprocessors: {
			"**/*.ts": ["karma-typescript"],
		},
		reporters: ["progress", "karma-typescript"],
		browsers: ["PhantomJS"]
	});
};