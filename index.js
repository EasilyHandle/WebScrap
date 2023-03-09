const mainScrapController = require("./mainScrap");
const dataBase = require("./database");
const scheduleManager = require('node-cron');
async function scrapSchedule(){
    const data = Date.now();
    console.log('Start scrapping');
    let scrapData = await mainScrapController.scrapAllData();
    await dataBase.addScrapedData(scrapData);
    console.log('Scraping successfull after ' + Date.now() - date + 'ms');
    console.log('Saving data...');


}
scrapSchedule()
// const job = scheduleManager.schedule("15 * * * *", scrapSchedule);