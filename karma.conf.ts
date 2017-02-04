module.exports = function (config) {
	config.set({
		frameworks: ["jasmine", "karma-typescript"],
		files: [
			{pattern: "tests/**/*.ts"},
			{pattern: "server/database/Connection.ts"},
			{pattern: "server/databaseConfig.ts"},
		],
		preprocessors: {
			"**/*.ts": ["karma-typescript"],
		},
		reporters: ["progress", "karma-typescript"],
		browsers: ["PhantomJS"]
	});
};