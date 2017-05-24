"use strict";
var utils_1 = require("./utils");
var Request = (function () {
    function Request() {
    }
    Request.prototype.get = function (url) {
        if (arguments.length !== 1) {
            throw new Error("Post requires 1 arguments, got " + arguments.length);
        }
        if (typeof url !== "string") {
            throw new Error("Url param should be a string, got " + typeof url);
        }
        return this._request("GET", url);
    };
    Request.prototype.post = function (url, data) {
        if (arguments.length !== 2) {
            throw new Error("Post requires 2 arguments, got " + arguments.length);
        }
        if (utils_1.isObject(data)) {
            url += "?";
            data = this._serialize(data);
        }
        return this._request("POST", url, data);
    };
    Request.prototype._serialize = function (obj) {
        var str = [];
        for (var p in obj)
            if (obj.hasOwnProperty(p)) {
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            }
        return str.join("&");
    };
    Request.prototype._request = function (requestType, url, data) {
        if (data === void 0) { data = null; }
        return new Promise(function (resolve, reject) {
            var request = new XMLHttpRequest();
            request.onreadystatechange = function () {
                if (request.readyState === 4) {
                    if (request.status === 200) {
                        var response;
                        try {
                            response = JSON.parse(request.response);
                        }
                        catch (err) {
                            response = request.response;
                        }
                        resolve(response);
                    }
                    else {
                        reject((Error(request.statusText)));
                    }
                }
            };
            request.open(requestType, url, true);
            request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
            request.send(data);
        });
    };
    return Request;
}());
exports.Request = Request;
//# sourceMappingURL=request.js.map