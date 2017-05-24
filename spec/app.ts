import {Model} from "../src/model"
import {listenTo} from "../src/listenTo"
//import race from "speedracer"
console.log("TEST Sipmle Model")

let easyModel = new Model();

listenTo(easyModel, "data", function(key, value){
    console.log(value, "UPDATING");
})

easyModel.set("data", {x:1, y: "n"}, {force:true});
  
let justData = easyModel.get("data",{immutable: true});
justData.x = 2;
justData.z = 2;
console.log(justData, "justData")

let anotherData = easyModel.get("data");
console.log(anotherData, "anotherData")


easyModel.set("data", {x:9, y: "m"}, {force:true});
console.log(justData, "justData"); 

console.log("END"); 
