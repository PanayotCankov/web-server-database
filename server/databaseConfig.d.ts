export declare let defaultConfig: {
    database: string;
    host: string;
    port: number;
    user: string;
    password: string;
    waitForConnections: boolean;
    connectionLimit: number;
};
export declare function GetDatabaseConfig(): {
    database: string;
    host: string;
    port: number;
    user: string;
    password: string;
    waitForConnections: boolean;
    connectionLimit: number;
};
