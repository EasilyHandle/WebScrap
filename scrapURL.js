const cheerio = require('cheerio');

const scraperURL = {
    async scraper(browser, url){        
        let allURLs = [];
        let page = await browser.newPage();
		await page.setDefaultNavigationTimeout(0);
		console.log('Seting viewport...')
		await page.setViewport({width: 1600, height: 900});
		console.log(`Navigating to ${url}...`);
		// Navigate to the selected page
		// await page.goto(url);
		await page.goto(url);
		function sleep(ms) {
			return new Promise((resolve) => {
			  setTimeout(resolve, ms);
			});
		}
		// await sleep(3000);
		console.log('Getting page data...')
        // property command exist?
        const f = await page.$("a[aria-label='Propiedades usadas']")
        if (f != null){
            await f.click();
            await page.waitForNavigation({waitUntil: 'load'});
        }
   
        let isNext = true;
        while(isNext){
            const pageData = await page.evaluate(() => {
                return {
                html: document.documentElement.innerHTML,
                };
            });
            tUrl = GetUrls(pageData);
            allURLs = allURLs.concat(tUrl);
            const nextButton = await page.$("a[title='Siguiente']")
            if (nextButton != null) {
                await nextButton.click();
                await page.waitForNavigation({waitUntil:'load'});
                isNext = true;
            } 
            else{
                isNext = false;
            }
            isNext = false;        
        }
		console.log('Scrapping Url......')

        function GetUrls(htmlPage) {
            let data = [];
            const $ = cheerio.load(htmlPage.html);
            let searchResult = $('#root-app > div > div.ui-search-main > section > ol');
		    searchResult.children().each((i, e) => {
                const url1 = $($(e).find('div.ui-search-result__content')).find('a').attr('href');
                data.push(url1);
                console.log(url1);
		    });
		    return data;
        }        
        return allURLs;        
    }
    
}

module.exports = (browser, url) => scraperURL.scraper(browser, url);