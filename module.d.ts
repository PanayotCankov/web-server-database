import { Express } from "express";
export declare class APIModule {
    router: any;
    name: string;
}
export declare let APIModules: APIModule[];
export declare function UseApi(app: Express): void;
