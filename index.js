const unirest = require('unirest');
const fs = require('fs')
let error = false

let start = 660067
let end = 0 //653501
fs.appendFile('links.txt', `======NEW======` + "\n", (err) => {
    if (err) throw err;
});

setInterval(() => {
    if(start - end <= 0){
        return console.log("Finished scraping")
    }

    run(start)
    start = start - 10
}, 10)

function run(count) {
    const req = unirest('GET', `https://unlistedvideos.com/videosm.php?vnlt=${count}`)
        .headers({
            'Cookie': 'usprivacy=1---; cf_chl_prog=a12; cf_clearance=YOURCLOUDFLARECLEARENCE',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.164 Safari/537.36'
        })
        .end(function (res) {
            if (res.error) return error = true;
            const jsdom = require("jsdom");
            const {JSDOM} = jsdom;
            const dom = new JSDOM(res.raw_body);

            for (let i = 1; i < 11; i++) {
                let link = dom.window.document.querySelector(`body > div > div:nth-child(6) > table > tbody > tr:nth-child(${i}) > td:nth-child(2) > b > a`).getAttribute("href")
                console.log(link)
                let dateString = dom.window.document.querySelector(`body > div > div:nth-child(6) > table > tbody > tr:nth-child(${i}) > td:nth-child(2) > table > tbody > tr:nth-child(2) > td:nth-child(2)`).textContent
                let epoch = new Date(dateString).getTime();
                if(epoch < 1483228800000){
                    fs.appendFile('2017.txt', `https://www.youtube.com/watch?v=` + link.replace("https://unlistedvideos.com/vm.php?v=youtube-", "").replace(".html", "") + "\n", (err) => {
                        if (err) throw err;
                    });
                }
                fs.appendFile('links.txt', `https://www.youtube.com/watch?v=` + link.replace("https://unlistedvideos.com/vm.php?v=youtube-", "").replace(".html", "") + "\n", (err) => {
                    if (err) throw err;
                });
                console.log(count)
            }
        });

}
