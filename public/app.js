var Model =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = __webpack_require__(4);
/**
* listenTo
* Listens for a model change and fires the callback function
* @param {model} model - model
* @param {string} action - the key/symbol of a model
* @param {function} func - the callback/ function triggered by model change
* @example
* // Listening for a model change
* let myModel = new Model()
*
* listenTo(myModel, "name", myFunction)
*
* myModel.set("name", "Vitalie") // The model was changed  name Vitalie
* myModel.set("name", "Dan") // The model was changed  name Dan
*
* function myFunction(key, value) {
*   console.log("The model was changed ", key, value )
* }
*/
function listenTo(model, action, func) {
    if (utils_1.isUndefined(model)) {
        throw new Error("model is undefined");
    }
    if (utils_1.isUndefined(action)) {
        throw new Error("action is undefined");
    }
    if (utils_1.isUndefined(func)) {
        throw new Error("func is undefined");
    }
    model.pubsub.subscribe(action, func);
}
exports.listenTo = listenTo;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = __webpack_require__(4);
var pubsub_1 = __webpack_require__(3);
var Model = (function () {
    /**
     * @param {Object} [defaults] - default arguments for the model.
     * @example
     * // Set a model with a string key and string as value
     * let model = new Model({id: 10})
     * console.log(model.get("id")) //10
     *
     * Warning:  pasing arguments to contructor(defaults) will not fire events
    */
    function Model(defaults) {
        if (defaults === void 0) { defaults = null; }
        this._map = new Map();
        this._pubsub = new pubsub_1.PubSub();
        if (arguments.length > 1)
            throw new Error("Passing more than one argument to the contructor, expected 1 got " + arguments.length);
        if (defaults && !utils_1.isObject(defaults))
            throw new Error("Argument should be Object, got " + typeof defaults);
        if (defaults)
            this.set(defaults, undefined, { silent: true });
    }
    Object.defineProperty(Model.prototype, "pubsub", {
        /**
        * Returns the pubsub instance
        */
        get: function () {
            return this._pubsub;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Model.prototype, "keys", {
        /**
        * Returns the model keys
        */
        get: function () {
            return this._map.keys();
        },
        enumerable: true,
        configurable: true
    });
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
    Model.prototype.set = function (key, value, options) {
        if (utils_1.isUndefined(key)) {
            throw new Error("Key is undefined");
        }
        if (!utils_1.isObject(key) && !utils_1.isUndefined(value)) {
            this._setSingleKey(key, value, options);
        }
        else {
            this._objToStrMap(key);
        }
    };
    /**
    * Set a single key with value
    * @param {string} key
    * @param {(string|Object)} value
    */
    Model.prototype._setSingleKey = function (key, value, options) {
        if (options === void 0) { options = {}; }
        if (options.force || this._isValueChanged(key, value)) {
            this._map.set(key, value);
            if (!options.silent)
                this._pubsub.publish(key, value);
        }
    };
    /**
    * Converts an object to key values
    * @param {Object} key - model key.
    */
    Model.prototype._objToStrMap = function (obj) {
        for (var _i = 0, _a = Object.keys(obj); _i < _a.length; _i++) {
            var key = _a[_i];
            this._setSingleKey(key, obj[key]);
        }
    };
    /**
    * Checks if the new value is differend from the old one
    * @param {(string|Object)} key - key can be string or {}.
    * @param {(string|Object)} [value] - value can be string or {}, not used if the key is an {}.
    * @return {boolean} boolean
    */
    Model.prototype._isValueChanged = function (key, value) {
        if (this._map.has(key)) {
            var oldValue = this._map.get(key);
            return !utils_1.isEqual(value, oldValue);
        }
        return true;
    };
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
    Model.prototype.get = function (key, options) {
        if (!utils_1.isUndefined(options) && options.immutable) {
            return utils_1.clone(this._map.get(key));
        }
        else {
            return this._map.get(key);
        }
    };
    return Model;
}());
exports.Model = Model;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var model_1 = __webpack_require__(1);
var listenTo_1 = __webpack_require__(0);
//import race from "speedracer"
console.log("TEST Sipmle Model");
var simpleModel = new model_1.Model();
listenTo_1.listenTo(simpleModel, "data", function (key, value) {
    console.log(value, "UPDATING");
});
simpleModel.set("data", { x: 1, y: "n" }, { force: true });
var justData = simpleModel.get("data", { immutable: true });
justData.x = 2;
justData.z = 2;
console.log(justData, "justData");
var anotherData = simpleModel.get("data");
console.log(anotherData, "anotherData");
simpleModel.set("data", { x: 9, y: "m" }, { force: true });
console.log(justData, "justData");
console.log("END");


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var PubSub = (function () {
    function PubSub() {
        this.topics = {};
        this.subUid = -1;
    }
    // Publish or broadcast events of interest
    // with a specific topic name and arguments
    // such as the data to pass along
    PubSub.prototype.publish = function (topic, args) {
        if (!(topic in this.topics) && !this.topics[topic]) {
            return false;
        }
        var subscribers = this.topics[topic], len = subscribers ? subscribers.length : 0;
        while (len--) {
            subscribers[len].func(topic, args);
        }
        return this;
    };
    // Subscribe to events of interest
    // with a specific topic name and a
    // callback function, to be executed
    // when the topic/event is observed
    PubSub.prototype.subscribe = function (topic, func) {
        if (!this.topics[topic]) {
            this.topics[topic] = [];
        }
        var token = (++this.subUid).toString();
        this.topics[topic].push({
            token: token,
            func: func
        });
        return token;
    };
    // Unsubscribe from a specific
    // topic, based on a tokenized reference
    // to the subscription
    PubSub.prototype.unsubscribe = function (token) {
        for (var m in this.topics) {
            if (this.topics[m]) {
                for (var i = 0, j = this.topics[m].length; i < j; i++) {
                    if (this.topics[m][i].token === token) {
                        this.topics[m].splice(i, 1);
                        return token;
                    }
                }
            }
        }
        return this;
    };
    return PubSub;
}());
exports.PubSub = PubSub;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// Is a given variable undefined?
function isUndefined(obj) {
    return obj === void 0;
}
exports.isUndefined = isUndefined;
;
// Is a given variable object?
function isObject(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
}
exports.isObject = isObject;
;
function isEqual(x, y) {
    'use strict';
    if (x === null || x === undefined || y === null || y === undefined) {
        return x === y;
    }
    // after this just checking type of one would be enough
    if (x.constructor !== y.constructor) {
        return false;
    }
    // if they are functions, they should exactly refer to same one (because of closures)
    if (x instanceof Function) {
        return x === y;
    }
    // if they are regexps, they should exactly refer to same one (it is hard to better equality check on current ES)
    if (x instanceof RegExp) {
        return x === y;
    }
    if (x === y || x.valueOf() === y.valueOf()) {
        return true;
    }
    if (Array.isArray(x) && x.length !== y.length) {
        return false;
    }
    // if they are dates, they must had equal valueOf
    if (x instanceof Date) {
        return false;
    }
    // if they are strictly equal, they both need to be object at least
    if (!(x instanceof Object)) {
        return false;
    }
    if (!(y instanceof Object)) {
        return false;
    }
    // recursive object equality check
    var p = Object.keys(x);
    return Object.keys(y).every(function (i) { return p.indexOf(i) !== -1; }) &&
        p.every(function (i) { return isEqual(x[i], y[i]); });
}
exports.isEqual = isEqual;
exports.clone = function (obj) {
    var copy;
    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj)
        return obj;
    // Handle Date
    if (obj instanceof Date) {
        copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }
    // Handle Array
    if (obj instanceof Array) {
        copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = exports.clone(obj[i]);
        }
        return copy;
    }
    // Handle Object
    if (obj instanceof Object) {
        copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr))
                copy[attr] = exports.clone(obj[attr]);
        }
        return copy;
    }
    throw new Error("Unable to copy obj! Its type isn't supported.");
};


/***/ })
/******/ ]);
//# sourceMappingURL=app.js.map