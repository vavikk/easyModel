import { isUndefined } from './utils'
import {PubSub} from './pubsub'
/**
*
* Channel Factory
* PubSub singeltons generator
* @example
* let ch1 = channel.getChannel("ModalWindow")
*
* ch1.subscribe("ModalWindow/open", message)
*
* ch1.publish('ModalWindow/open', {responsive:true, title: "My Modal Title"}) // will call the message function
*
* function message(key, value) {
*   console.log( key, value) // ModalWindow/open Object {responsive: true, title: "My Modal Title"}
* }
*/
export class ChannelFactory {
    private _channels: any;
    constructor() {
        this._channels = new Map()
    }

    /**
    * Returns a channel instance as a singelton,
    * if the instance is missing it will create it.
    *
    *
    * @param {string} name - channel name
    * @return {Object} returns the pubsub instance
    * @example
    * // Create and get a new channel
    * let ch1 = channel.get("ModalWindow")
    *
    * ch1.subscribe("ModalWindow/open", message)
    *
    * ch1.publish('ModalWindow/open', {responsive:true, title: "My Modal Title"}) // will call the message function
    *
    * function message(key, value) {
    *   console.log("channels", key, value)
    * }
    */
    get(name:string) {
        if (!this._channels.has(name)) {
            this._create(name)
        }
        return this._channels.get(name)
    }
    private _create(name:string) {
        const ps: PubSub = new PubSub()
        this._channels.set(name, ps)
        return ps
    }
}

export let channels = new ChannelFactory();
