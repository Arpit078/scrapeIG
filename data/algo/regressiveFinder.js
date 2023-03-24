const userArr = ["reiiteri","dbagdraws","morvalii"]

const fs = require("fs")
// const commonFinderAll = require("./commonFinderAll")


function regressiveFinder(userArr){
    const bigArr = []
    for(let i =0;i<userArr.length;i++){
        for(let j=i+1;j<userArr.length;j++){
            const commonWith = userArr[i]
            const common = userArr[j]
            const smallArr = require(`./common/commonFollowersBW_${common}_and_${commonWith}`)
            for(let k=0;k<smallArr.length;k++){
                bigArr.push(smallArr[k])
            }
        }
    }
    for(let i=0;i<bigArr.length;i++){
        for(let j=i+1;j<bigArr.length;j++){
            if(bigArr[i].username==bigArr[j].username){
                bigArr[i].count ++;
                bigArr.splice(j,1)
                // j--
            }
        }
    }
    bigArr.sort((a,b)=> b.count - a.count)
    console.log(bigArr)
    const data = `const commonFinalArr = ${JSON.stringify(bigArr)};module.exports = commonFinalArr`
    fs.writeFile("./common/final/final.js",data,(err)=>{if(err){console.log(err)}console.log("ok")})


}


// commonFinderAll(userArr)
regressiveFinder(userArr)