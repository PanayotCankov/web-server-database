export declare class QueryRequest {
    constructor(query_value: string, callback_value: (data: any[]) => any);
    callback: (data: any) => any;
    query: string;
}
