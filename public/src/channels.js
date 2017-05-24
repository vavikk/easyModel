"use strict";
var pubsub_1 = require("./pubsub");
var ChannelFactory = (function () {
    function ChannelFactory() {
        this._channels = new Map();
    }
    ChannelFactory.prototype.get = function (name) {
        if (!this._channels.has(name)) {
            this._create(name);
        }
        return this._channels.get(name);
    };
    ChannelFactory.prototype._create = function (name) {
        var ps = new pubsub_1.PubSub();
        this._channels.set(name, ps);
        return ps;
    };
    return ChannelFactory;
}());
exports.ChannelFactory = ChannelFactory;
exports.channels = new ChannelFactory();
//# sourceMappingURL=channels.js.map