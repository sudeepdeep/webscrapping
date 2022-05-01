const puppeteer = require('puppeteer')
const express = require('express')

const app = express()

app.get('/',(req, res) => {
    console.log("Please Wait... Processing The Data!!")
    let webscrapping = async (url) => {
        var browser = await puppeteer.launch()
        var page = await browser.newPage()
        await page.goto(url)
      
       await page.$eval("body > main > section.homepage-section-v2.voices-ls > div.partial.latest-stories > ul", (ui) => {
            let length = ui.children.length
            let final_arr = []
            
            let ulink;

            let flink;
            
            let child;
    
            let dummy_dic = {}
            let fin_dic = {}
           for (let i = 0; i < length; i++) {
            ulink =  'https://time.com' + ui.children[i].getElementsByTagName('a')[0].getAttribute('href')
            flink =  ui.children[i].getElementsByTagName('a')[0]
            child = flink.children[0]
            utitle = child.innerHTML;
    
            dummy_dic['title'] = utitle
            dummy_dic['link'] = ulink
    
    
            fin_dic = dummy_dic
    
            dummy_dic = {}
    
            final_arr.push(fin_dic)
    
           }
    
          
            return final_arr
       }).then(data => {
           console.log(data)
       })
    
      
    
        browser.close();
    }
    
    webscrapping('https://time.com/')
    res.send("Please check the console...")
})



app.listen(3000, () => {
    console.log('listening on port 3000')
})