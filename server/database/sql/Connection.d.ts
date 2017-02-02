/// <reference types="es6-shim" />
import { QueryRequest } from "./QueryRequest";
export declare class Connection {
    static pool: any;
    static poolActiveConnections: number;
    requestPool: QueryRequest[];
    static format(query: string, inserts: string[]): string;
    static createPoolConnection(): void;
    static query(query: string): Promise<any>;
    static executeQueryRequestOnConnection(mysqlCon: any, requestPool: QueryRequest[], finishedCallback: () => any): void;
    executePool(savedAllCallback: () => any): void;
}