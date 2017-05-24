"use strict";
var PubSub = (function () {
    function PubSub() {
        this.topics = {};
        this.subUid = -1;
    }
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
//# sourceMappingURL=pubsub.js.map