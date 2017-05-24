"use strict";
var utils_1 = require("./utils");
var pubsub_1 = require("./pubsub");
var Model = (function () {
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
        get: function () {
            return this._pubsub;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Model.prototype, "keys", {
        get: function () {
            return this._map.keys();
        },
        enumerable: true,
        configurable: true
    });
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
    Model.prototype._setSingleKey = function (key, value, options) {
        if (options === void 0) { options = {}; }
        if (options.force || this._isValueChanged(key, value)) {
            this._map.set(key, value);
            if (!options.silent)
                this._pubsub.publish(key, value);
        }
    };
    Model.prototype._objToStrMap = function (obj) {
        for (var _i = 0, _a = Object.keys(obj); _i < _a.length; _i++) {
            var key = _a[_i];
            this._setSingleKey(key, obj[key]);
        }
    };
    Model.prototype._isValueChanged = function (key, value) {
        if (this._map.has(key)) {
            var oldValue = this._map.get(key);
            return !utils_1.isEqual(value, oldValue);
        }
        return true;
    };
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
//# sourceMappingURL=model.js.map