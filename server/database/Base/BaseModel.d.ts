/// <reference types="es6-shim" />
export declare function hashString(input: any, _salt: any): Promise<string>;
export declare function NewUID(): string;
export declare function mapObjectToObject(from: any, to: any, schema?: any): void;
export declare abstract class ServerModel {
    modelType: any;
    _id: string;
    existingModel: boolean;
    constructor(instance: any, modelType: any);
    presave(): Promise<void>;
    protected abstract saveScript(modelInstance: any): Promise<string>;
    save(): Promise<ServerModel>;
    protected abstract createScript(modelInstance: any): Promise<string>;
    create(): Promise<ServerModel>;
    protected abstract removeByIdScript(id: string): Promise<string>;
    removeById(id: string): Promise<void>;
    remove(): Promise<void>;
    protected abstract getOneByIdScript(id: string): Promise<string>;
    getOneById(id: string): Promise<ServerModel>;
    protected abstract getAllScript(limit: number, skip: number): Promise<string>;
    all(limit?: number, skip?: number): Promise<any[]>;
    protected abstract getCountScript(): Promise<string>;
    getCount(): Promise<number>;
}
