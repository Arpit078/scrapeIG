const axios = require("axios")
const cheerio = require("cheerio")
const promptChoice = ["character","creature-prompts","environment-prompts","object-prompt"]
async function genPrompt(){
    const url = `https://artprompts.org/${promptChoice[Math.floor(Math.random()*4)]}/`
    axios.get(url)
        .then((response)=>{
        const html = response.data
        const $ = cheerio.load(html) 
        const promptDiv = $(".et_pb_text_inner p") 
        const prompt = promptDiv.find("span").text()
        // console.log(prompt)
        return prompt
    }).catch((err)=> console.log(err))
}
module.exports = genPrompt

