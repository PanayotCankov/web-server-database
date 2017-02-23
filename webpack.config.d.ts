declare var _default: {
    devtool: string;
    entry: string[];
    output: {
        publicPath: string;
        path: any;
        filename: string;
    };
    externals: {
        'crypto': string;
        '$': string;
    };
    resolve: {
        extensions: string[];
        modulesDirectories: string[];
    };
    plugins: any[];
    target: string;
    node: {
        fs: string;
        helmet: string;
    };
    module: {};
};
export default _default;
