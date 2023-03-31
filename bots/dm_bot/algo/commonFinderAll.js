// const arrtwodata = require("../arrtwo")
const fs = require("fs")
const userArr = ["reiiteri","dbagdraws","morvalii"]

function commonFinder(arronedata,arrtwodata,common,commonWith){
        arroneLen = arronedata.followers.length
        arrtwoLen = arrtwodata.followers.length
        if(arroneLen>arrtwoLen){
            let hash = []
            for(let i =0;i<arrtwoLen;i++){
                for(let j=0;j<arroneLen;j++){
                    if(arrtwodata.followers[i].username==arronedata.followers[j].username){
                        const follower = {
                            username : arrtwodata.followers[i].username ,
                            count : 1
                        }
                        
                        hash.push(follower)
                    }
                }
            }
            const data = `const commonFollowerData = ${JSON.stringify(hash)};module.exports = commonFollowerData`
            fs.writeFile(`./common/commonFollowersBW_${common}_and_${commonWith}.js`,data,(err)=>{
                if(err){console.log(err)}
                console.log(hash)
            })
        }
        else{
            let hash = []
            for(let i =0;i<arroneLen;i++){
                for(let j=0;j<arrtwoLen;j++){
                    if(arronedata.followers[i].username==arrtwodata.followers[j].username){
                    const follower = { 
                        username : arrtwodata.followers[i].username ,
                        count : 1
                    }

                        
                        hash.push(follower)
                    }
                }
            }
            const data = `const commonFollowerData = ${JSON.stringify(hash)};module.exports = commonFollowerData`
            fs.writeFile(`./common/commonFollowersBW_${common}_and_${commonWith}.js`,data,(err)=>{
                if(err){console.log(err)}
                console.log(hash)
            })
        }
}

function commonFinderAll(userArr){
    for(let i = 0;i<userArr.length;i++){
        for(let j=i+1;j<userArr.length;j++){
            const commonWith = userArr[i]
            const common = userArr[j]
            const arronedata = require(`../scrapedUsers/${commonWith}`)
            const arrtwodata = require(`../scrapedUsers/${common}`)
            commonFinder(arronedata,arrtwodata,common,commonWith)
        }
    }
}

commonFinderAll(userArr)
// module.exports = commonFinderAll