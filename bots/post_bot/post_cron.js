import postCreate from "./post_create/action.js"
import fs from "fs"
import toWrite from "./toWrite.js"
const now = new Date();
const currentHour = now.getHours();
console.log(currentHour)
if (currentHour >= 18 && currentHour <= 23 && toWrite) {
    postCreate()
    fs.writeFile("./toWrite.js","const toWrite = false;export default toWrite",(err)=>{console.log(err)})
} 

if(currentHour<18||currentHour>23){
    fs.writeFile("./toWrite.js","const toWrite = true;export default toWrite",(err)=>{console.log(err)})
}
