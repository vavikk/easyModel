
# easyModel
DATA collections for Javascript with event dispatching and immutable feature.

## Install

```shell
npm install easymodel 
```

## Usage
 ```javascript
//ES6
import {Model} from 'easymodel';
let model = new Model();
model.set("id", 10);
console.log(model.get("id")); // outputs 10
 
model.set("id", 11);
console.log(model.get("id")); // outputs 11
```
### set
```javascript
//ES6
model.set("id", 10);
console.log(model.get("id")); // outputs 10
//OR
model.set({id: 22});
console.log(model.get("id")); // outputs 22
```
### get
```javascript
//ES6
model.set({
  name : "John", 
  age  : 22
})

let name = model.get("name");
let age =  model.get("age");
console.log( name , age ) // John, 22

model.set("name", "Dan");
name = model.get("name");
console.log( name , age ) // Dan, 22
```
## Model events and listenTo
```javascript
//ES6
import {Model, listenTo} from "easymodel";
let model = new Model();

listenTo(model, "name", (key, value) => {
  console.log(`The ${key} has changed to ${value}`)
})

model.set("name", "John Doe"); // outputs The name has changed to John Doe
model.set("name", "Lisa Doe"); // outputs The name has changed to Lisa Doe
model.set("name", "Lisa Doe"); // will not output anything
```
### Silent Mode
Set a model without dispatching an event (silent mode)
```javascript
model.set("name", "Vitalie", {silent: true})
```
### Force Mode
```javascript
model.set("name", "Vitalie", {force: true})
``` 
will dispatch an event even if the value is the same as previous.
## Immutability
```javascript
model.set("data", {x:1})
let data = model.get("data", {immutable: true});
data.x = 2;
console.log(data) // {x:2}
let newData = model.get("data");
console.log(newData) // {x:1}
``` 
More documentation: 
http://vavikk.github.io/easymodel/

