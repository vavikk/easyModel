import {Model} from "../src/model"
import {listenTo} from "../src/listenTo"
//import race from "speedracer"
console.log("TEST Sipmle Model")

let simpleModel = new Model();

listenTo(simpleModel, "data", function(key, value){
    console.log(value, "UPDATING");
})

simpleModel.set("data", {x:1, y: "n"}, {force:true});
  
let justData = simpleModel.get("data",{immutable: true});
justData.x = 2;
justData.z = 2;
console.log(justData, "justData")

let anotherData = simpleModel.get("data");
console.log(anotherData, "anotherData")


simpleModel.set("data", {x:9, y: "m"}, {force:true});
console.log(justData, "justData"); 

console.log("END"); 
