"use strict"
import { isUndefined } from './utils'
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
export function listenTo(model, action, func) {
  if(isUndefined(model)) {
    throw new Error("model is undefined")
  }
  if(isUndefined(action)) {
    throw new Error("action is undefined")
  }
  if(isUndefined(func)) {
    throw new Error("func is undefined");
  }
  model.pubsub.subscribe(action, func)
}
