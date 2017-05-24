export declare class PubSub {
    private topics;
    private subUid;
    constructor();
    publish(topic: any, args: any): false | this;
    subscribe(topic: any, func: any): string;
    unsubscribe(token: any): any;
}
