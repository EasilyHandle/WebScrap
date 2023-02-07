const mainScrapController = require("./mainScrap");
const scheduleManager = require('node-cron');
async function scrapSchedule(){
    const data = Date.now();
    console.log('Start scrapping');
    let scrapData = await mainScrapController();
    console.log('Scraping successfull after ' + Date.now() - date + 'ms');
    console.log('Saving data...');


}
const job = scheduleManager.schedule("* 12 * * *", scrapSchedule);