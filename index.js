const unirest = require('unirest');
const fs = require('fs')

let start = 653501

setInterval(() => {
    run(start)
    start = start - 10
}, 100)

function run(count) {
    const req = unirest('GET', `https://unlistedvideos.com/videosm.php?vnlt=${count}`)
        .headers({
            'Cookie': 'usprivacy=1---; cf_chl_rc_m=1; cf_chl_prog=a10; cf_clearance=xxx',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.106 Safari/537.36'
        })
        .end(function (res) {
            if (res.error) throw new Error(res.error);
            const jsdom = require("jsdom");
            const {JSDOM} = jsdom;
            const dom = new JSDOM(res.raw_body);

            for (let i = 1; i < 11; i++) {
                console.log(i)
                let jdd = dom.window.document.querySelector(`body > div > div:nth-child(6) > table > tbody > tr:nth-child(${i}) > td:nth-child(2) > b > a`).getAttribute("href")
                console.log(jdd)
                fs.appendFile('links.txt', `https://www.youtube.com/watch?v=` + jdd.replace("https://unlistedvideos.com/vm.php?v=youtube-", "").replace(".html", "") + "\n", (err) => {
                    if (err) throw err;
                });
                console.log(count)
            }
        });

}
