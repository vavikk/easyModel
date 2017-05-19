import { isUndefined, isObject, isEqual, clone} from "./utils"
import {PubSub} from "./pubsub"
export class Model {
    private _map: any;
    private _pubsub: any;
    /**
     * @param {Object} [defaults] - default arguments for the model.
     * @example
     * // Set a model with a string key and string as value
     * let model = new Model({id: 10})
     * console.log(model.get("id")) //10
     *
     * Warning:  pasing arguments to contructor(defaults) will not fire events
    */
    constructor(defaults: any = null) {
        this._map = new Map();
        this._pubsub = new PubSub()
        if(arguments.length > 1) throw new Error(`Passing more than one argument to the contructor, expected 1 got ${arguments.length}`)
        if(defaults && !isObject(defaults)) throw new Error(`Argument should be Object, got ${typeof defaults}`)
        if(defaults) this.set(defaults, undefined, { silent: true })
    }
    /**
    * Returns the pubsub instance
    */
    get pubsub() {
        return this._pubsub;
    }
    /**
    * Returns the model keys
    */
    get keys() {
        return this._map.keys()
    }
    /**
    * Model set.
    * @param {(string|Object)} key - key can be string or {}.
    * @param {(string|Object)} [value] - value can be string or {}, not used if the key is an {}.
    * @param {Object} [options] - model options.
    * @example
    * // Set a model with a string key and string as value
    * model.set("name", "Vitalie")
    * @example
    * // Set a model with a string key and object as value
    * model.set("person", {
    *   firstName: "Vitalie",
    *   lastName: "Jerebnii"
    * })
    * @example
    * // Set a model with an object and mixed values
    * model.set({
    *   id: 10,
    *   person: {
    *     firstName: "Vitalie",
    *     lastName: "Jerebnii"
    *   }
    * })
    * @example
    * // Set a model without dispatching an event (silent mode)
    * model.set("name", "Vitalie", {silent: true})
    */
    set(key , value?: any, options?: any): void{
        if(isUndefined(key)) {
            throw new Error("Key is undefined")
        }
        if(!isObject(key) && !isUndefined(value)) {
            this._setSingleKey(key, value, options)
        } else {
            this._objToStrMap(key)
        }

    }
    /**
    * Set a single key with value
    * @param {string} key
    * @param {(string|Object)} value
    */
    private _setSingleKey(key,value, options: any = {}): void {
        if( options.force || this._isValueChanged(key,value)) {
            this._map.set(key, value)
            if(!options.silent)
                this._pubsub.publish(key, value)
        }
    }
    /**
    * Converts an object to key values
    * @param {Object} key - model key.
    */
    private _objToStrMap(obj): void {
      for (const key of Object.keys(obj)) {
        this._setSingleKey(key,obj[key])
      }
    }
    /**
    * Checks if the new value is differend from the old one
    * @param {(string|Object)} key - key can be string or {}.
    * @param {(string|Object)} [value] - value can be string or {}, not used if the key is an {}.
    * @return {boolean} boolean
    */
    private _isValueChanged(key,value) {
      if(this._map.has(key)) {
        let oldValue = this._map.get(key)
        return  !isEqual(value, oldValue)
      }
      return true
    }
    /**
    * Model get.
    * @param {(string)} key - model key.
    * @param {Object} [options] - get options.
    * @return {string|Object} The model value as string or object
    * @example
    * // Set a model with a string key and string as value
    * model.set("name", "Vitalie")
    * let name = model.get("name")
    * console.log(name) // "Vitalie"
    * @example 
    * // Using immutability
    * model.set("data", {x:1})
    * let data = model.get("data", {immutable: true});
    * data.x = 2;
    * console.log(data) // {x:2}
    * let newData = model.get("data");
    * console.log(newData) // {x:1}
    * 
    */
    get(key, options?: any) {
        if( !isUndefined(options) && options.immutable ) {
            return clone(this._map.get(key))
        } else {
            return this._map.get(key);
        }
    }
}
