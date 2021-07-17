# UnlistedVideosScraper
Scraping https://unlistedvideos.com/
Youtube is removing all unlisted videos made before Jan 1st 2017 in 1 month, we are trying to archive many of them. Here is a script to get about 600,000.

## USAGE
* Open index.js and edit the COOKIE header, you can find this by pressing F12, going to the network tab, refresh, click the first request, find the request headers and copy `cookie`.
* `npm install`
* `node index.js` - Please note you may have to repeat step 1 a few times depending on how suspicious you are to cloudflare. If you get a 403 error, do the cloudflare captcha then copy the last number sent in console and change `let start = 653501`. The program will continue downloading the rest of the pages.
