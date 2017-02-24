/// <reference types="express" />
import { Application } from "./App";
import { Database } from "./databaseConfig";
import * as e from "express";
export interface APIModule {
    router: e.Router;
    name: string;
}
export declare class ModuleClass {
    Logs: {
        logs: (log: string) => void;
        privateLogs: string[];
    };
    Server: {
        App: Application;
        NumberChecker: (input: any) => number;
        Database: Database;
    };
}
export declare let Module: ModuleClass;
