"use strict";
var utils_1 = require("./utils");
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
//# sourceMappingURL=listenTo.js.map