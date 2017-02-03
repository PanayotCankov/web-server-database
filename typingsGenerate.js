require('dts-generator').default({
    name: 'web-server-database',
    project: '.',
    out: 'lib/typings.d.ts',
    excludes: [
        "node_modules/**/*.d.ts",
        "typings/**/*.d.ts",
        "lib/**/*.d.ts"
    ]
});
//# sourceMappingURL=typingsGenerate.js.map