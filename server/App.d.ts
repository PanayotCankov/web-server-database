import * as express from 'express';
import { APIModule } from "./module";
export declare class Application {
    express: express.Application;
    APIModules: APIModule[];
    webpackConfig: {
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
    constructor();
    private middleware();
    private api();
    listen(port?: number): void;
}
declare let app: Application;
export declare let App: Application;
export default app;
