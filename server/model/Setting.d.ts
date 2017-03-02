export declare class Setting {
    id: string;
    key: string;
    value: string;
    constructor(instance?: any);
    static all(limit?: number, skip?: number): Promise<any[]>;
    save(): Promise<void>;
    static save(setting: any): Promise<void>;
    private static create(setting);
    static getOneByName(name: string): Promise<Setting>;
}
