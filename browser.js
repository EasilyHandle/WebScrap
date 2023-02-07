const puppeteer = require('puppeteer');

async function startBrowser(){
	let browser;
	try {
        const args = [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-infobars',
            '--window-position=0,0',
            '--ignore-certifcate-errors',
            '--ignore-certifcate-errors-spki-list',
            '--user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0 Safari/537.36"'
        ];
    
        const options = {
            args,
            headless: false,
            ignoreHTTPSErrors: false,
            userDataDir: './tmp'
        };
	    console.log("Opening the browser......");
	    browser = await puppeteer.launch(options);
	} catch (err) {
	    console.log("Could not create a browser instance => : ", err);
	}
	return browser;
}

module.exports = {
	startBrowser
};