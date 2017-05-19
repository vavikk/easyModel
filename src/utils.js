// Is a given variable undefined?
export function isUndefined(obj) {
  return obj === void 0
};
// Is a given variable object?
export function isObject(obj) {
  var type = typeof obj
  return type === 'function' || type === 'object' && !!obj
};

export function isEqual(x, y) {
  'use strict'

  if (x === null || x === undefined || y === null || y === undefined) { return x === y }
  // after this just checking type of one would be enough
  if (x.constructor !== y.constructor) { return false }
  // if they are functions, they should exactly refer to same one (because of closures)
  if (x instanceof Function) { return x === y }
  // if they are regexps, they should exactly refer to same one (it is hard to better equality check on current ES)
  if (x instanceof RegExp) { return x === y }
  if (x === y || x.valueOf() === y.valueOf()) { return true }
  if (Array.isArray(x) && x.length !== y.length) { return false }

  // if they are dates, they must had equal valueOf
  if (x instanceof Date) { return false }

  // if they are strictly equal, they both need to be object at least
  if (!(x instanceof Object)) { return false }
  if (!(y instanceof Object)) { return false }

  // recursive object equality check
  var p = Object.keys(x)
  return Object.keys(y).every(function (i) { return p.indexOf(i) !== -1 }) &&
  p.every(function (i) { return isEqual(x[i], y[i]) })
}
export let clone = function (obj) {
    var copy;

    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;

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
            copy[i] = clone(obj[i]);
        }
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
        }
        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
}/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


