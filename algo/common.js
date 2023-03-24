// const arrtwodata = require("../arrtwo")
const fs = require("fs")
const commonWith = "morvalii"
const common = "reiiteri"
const arronedata = require(`../scrapedUsers/${commonWith}`)
const arrtwodata = require(`../scrapedUsers/${common}`)
// const help = require("./help")

// console.log(arrtwodata.followers[0].username)
// console.log(arronedata.followers[0].username)

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
    fs.writeFile("./commonFollowers.js",data,(err)=>{
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
    fs.writeFile(`./commonWith${commonWith}/commonFollowersBW_${common}_and_${commonWith}.js`,data,(err)=>{
        if(err){console.log(err)}
        console.log(hash)
    })
}