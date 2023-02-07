const cheerio = require('cheerio');
const scraperObject = {
    async scraper(browser, url){
        let page = await browser.newPage();
		await page.setDefaultNavigationTimeout(0);
		console.log('Seting viewport...')
		// await page.setViewport({width: 1600, height: 900});
		console.log(`Navigating to ${url}...`);
		// Navigate to the selected page
		await page.goto(url);
		// function sleep(ms) {
		// 	return new Promise((resolve) => {
		// 	  setTimeout(resolve, ms);
		// 	});
		// }
		// await sleep(3000);
		console.log('Getting page data...')
		const pageData = await page.evaluate(() => {
			return {
			html: document.documentElement.innerHTML,
			};
			});
		const $ = cheerio.load(pageData.html);

		
		let data = [];
		console.log('Scrapping......')
		data.push({'typeOfProperty': $('#header > div > div.ui-pdp-header__subtitle > span').text()});
		data.push({'title': $('#header > div > div.ui-pdp-header__title-container > h1').text()});
        data.push({'price': $('#price > div > div.ui-pdp-price__second-line > span > span.andes-money-amount__fraction').text()});
        data.push({'conversionPrice': $('#price > div > div.ui-pdp-price__subtitles > p > span > span.andes-money-amount__fraction').text()});
        data.push({'commonExpense': $('#maintenance_fee_vis > p').text()});
        data.push({'totalArea': $('#highlighted_specs_res > div > div:nth-child(1) > span').text()});
        data.push({'roomQuantity': $('#highlighted_specs_res > div > div:nth-child(2) > span').text()});
        data.push({'bathQuantity': $('#highlighted_specs_res > div > div:nth-child(3) > span').text()});
        data.push({'address': $('#location > div > div.ui-pdp-media.ui-vip-location__subtitle.ui-pdp-color--BLACK > div > p').text()});
        data.push({'priceThis': $('#price_comparison > div > div.ui-pdp-chart > div.ui-pdp-chart__graph.ui-pdp-chart__graph-size--large > div.ui-pdp-chart__tooltip.ui-pdp-chart--visible.ui-pdp-chart--alone > div.ui-pdp-chart__tooltip-value.ui-pdp-background-color--BLUE > p').text()});
		data.push({'pricePer': $('#price_comparison > div > div.ui-pdp-price-comparison__extra-info-wrapper > div:nth-child(2) > p.ui-pdp-color--BLACK.ui-pdp-size--XSMALL.ui-pdp-family--REGULAR.ui-pdp-price-comparison__extra-info-element-value').text()});
        data.push({'averageInArea': $('#price_comparison > div > div.ui-pdp-price-comparison__extra-info-wrapper > div:nth-child(3) > p.ui-pdp-color--BLACK.ui-pdp-size--XSMALL.ui-pdp-family--REGULAR.ui-pdp-price-comparison__extra-info-element-value').text()});
        data.push({'brokerName': $('#seller_profile > div.ui-vip-profile-info > div.ui-vip-profile-info__info-container > div > h3').text()});
        data.push({'description': $('#description > div > p').text()});    
        let characteristics = $('#technical_specifications > div > div.ui-pdp-specs__table > table > tbody');
		characteristics.children().each((i, e) => {
			let tag = $(e).find('th').text();
			// console.log(tag)
			console.log(i,'th row reading...')
			let cont = $(e).find('td').text();
			data.push({[tag]:cont});
		});
		await page.close();
		return data;
    }
}

module.exports = (browser, url) => scraperObject.scraper(browser, url);