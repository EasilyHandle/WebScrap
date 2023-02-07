const scraperObject = {
        async  scraper(page, url){
		console.log(`Navigating to ${url}...`);
		// Navigate to the selected page
		await page.goto(url);
        const pageData = await page.evaluate(() => {
            return {
            html: document.documentElement.innerHTML,
            };
            });
        const $ = cheerio.load(pageData.html);    
        let typeOfProperty = $('#header > div > div.ui-pdp-header__subtitle > span > font > font').text();
        let title = $('#header > div > div.ui-pdp-header__title-container > h1 > font > font').text();
        let price = $('#price > div > div.ui-pdp-price__second-line > span').text();
        let conversionPrice = $('#price > div > div.ui-pdp-price__subtitles > p > span').text()
        let commonExpense = $('#maintenance_fee_vis > p > font > font').text();
        let totalArea = $('#highlighted_specs_res > div > div:nth-child(1) > span > font > font').text();
        let roomQuantity = $('#highlighted_specs_res > div > div:nth-child(2) > span > font > font').text();
        let bathQuantity = $('#highlighted_specs_res > div > div:nth-child(3) > span > font > font').text();
        let adress = $('#location > div > div.ui-pdp-media.ui-vip-location__subtitle.ui-pdp-color--BLACK > div > p > font > font').text();
        let pricePer = $('#price_comparison > div > div.ui-pdp-price-comparison__extra-info-wrapper > div:nth-child(2) > p.ui-pdp-color--BLACK.ui-pdp-size--XSMALL.ui-pdp-family--REGULAR.ui-pdp-price-comparison__extra-info-element-value > font > font').text();
        let averageInArea = $('#price_comparison > div > div.ui-pdp-price-comparison__extra-info-wrapper > div:nth-child(3) > p.ui-pdp-color--BLACK.ui-pdp-size--XSMALL.ui-pdp-family--REGULAR.ui-pdp-price-comparison__extra-info-element-value > font > font').text();
        let brokerName = $('#seller_profile > div.ui-vip-profile-info > div.ui-vip-profile-info__info-container > div > h3 > font > font').text();
        let description = $('#description > div > p').text();    
        let characterTotalArea = $('#technical_specifications > div > div.ui-pdp-specs__table > table > tbody > tr:nth-child(1) > td > span > font > font').text();

		
		return{
			'typeOfProperty':typeOfProperty,
			'title':title,
			'price':price,
			'conversionPrice':conversionPrice,
			'commonExpense':commonExpense,
			'totalArea':totalArea,
			'roomQuantity':roomQuantity,
			'bathQuantity':bathQuantity,
			'adress':adress,
			'pricePer':pricePer,
			'averageInArea':averageInArea,
			'brokerName':brokerName,
			'description':description,
			'characterTotalArea':characterTotalArea
		}

    }
}

module.exports = scraperObject; 