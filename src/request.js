import { isUndefined, isObject } from './utils'

/** Get and Post with promise */
export class Request {
    /**
    * @param {String} url - file url.
    * @return {Promise} returns a promise
    * @example
    * let request = new Request()
    * request.get("public/json/myFIle.json")
    * .then(
    *   data => {
    *     console.log("Data is an object", data)
    *     callback(data) // calls a function with this params
    *   }
    * )
    */
    get(url) {
        if (arguments.length !== 1) {
            throw new Error(`Post requires 1 arguments, got ${arguments.length}`)
        }
        if (typeof url !== "string") {
            throw new Error(`Url param should be a string, got ${typeof url}`)
        }
        return this._request("GET", url)
    }
    /**
    * @param {String} url - file url.
    * @param {(String|Object)} data - data posted, Ex. string:  data= "?name=Vitalie" Ex. object: data = {name:"Vitalie"}
    * @return {Promise} returns a promise
    * @example
    * let request = new Request()
    * request.post("/lobby/virtual-goods-buy-gift", someData)
    * .then(
    *   data => {
    *     console.log("Data is an object", data)
    *     callback(data) // calls a function with this params
    *   }
    * )
    */
    post(url, data) {
        if (arguments.length !== 2) {
            throw new Error(`Post requires 2 arguments, got ${arguments.length}`)
        }
        if (isObject(data)) {
            url += "?"
            data = this._serialize(data)
        }
        return this._request("POST", url, data)
    }
    _serialize(obj) {
        let str = []
        for (let p in obj)
            if (obj.hasOwnProperty(p)) {
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]))
            }
        return str.join("&")
    }
    _request(requestType, url, data = null) {
        return new Promise((resolve, reject) => {
            let request = new XMLHttpRequest()
            request.onreadystatechange = () => {
                if (request.readyState === 4) {
                    if (request.status === 200) {
                        var response;
                        try {
                            response = JSON.parse(request.response)
                        } catch( err) {
                            response = request.response;
                        }
                        resolve(response)
                    } else {
                        reject((Error(request.statusText)))
                    }
                }
            }
            request.open(requestType, url, true)
            request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
            request.send(data)
        })
    }
}