export declare class Request {
    get(url: string): Promise<{}>;
    post(url: string, data: any): Promise<{}>;
    private _serialize(obj);
    private _request(requestType, url, data?);
}
