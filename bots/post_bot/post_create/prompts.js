import axios from "axios"
import cheerio from "cheerio"
const promptChoice = ["creature-prompts","character","environment-prompts"]

async function genPrompt(){
    const url = `https://artprompts.org/${promptChoice[Math.floor(Math.random()*3)]}/`
    const promptText = axios.get(url)
        .then((response)=>{
        const html = response.data
        const $ = cheerio.load(html) 
        const promptDiv = $(".et_pb_text_inner p") 
        const prompt = promptDiv.find("span").text()
        // console.log(prompt)
        return prompt
    }
    ).catch((err)=> console.log(err))
    return promptText
}
export default genPrompt
// let text  = await genPrompt()
// console.log(text)


