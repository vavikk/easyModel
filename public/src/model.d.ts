export declare class Model {
    private _map;
    private _pubsub;
    constructor(defaults?: any);
    readonly pubsub: any;
    readonly keys: any;
    set(key: any, value?: any, options?: any): void;
    private _setSingleKey(key, value, options?);
    private _objToStrMap(obj);
    private _isValueChanged(key, value);
    get(key: any, options?: any): any;
}
