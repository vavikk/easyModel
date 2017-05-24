export declare class ChannelFactory {
    private _channels;
    constructor();
    get(name: string): any;
    private _create(name);
}
export declare let channels: ChannelFactory;
