const browserObject = require("./browser");
const scrapUrlController = require("./scrapURL");
const scrapContentController = require("./scrapContent.js")
const salesType = ['venta', 'arriendo'];
const buildingType = ['departamento', 'casa', 'oficina', 'parcela', 'comercial', 'terreno-en-construccion', 
'sitio', 'industrial', 'bodega', 'otros', 'agricola','estacionamiento', 'loteo', 'lotes-cementerio'];
const url = 'https://www.portalinmobiliario.com/'
let scrapedData = [];
async function scrapAllData(){
    let browserInstance = await browserObject.startBrowser();
    let buildingUrl;
    for (let i = 0; i < buildingType.length; i++){
        buildingUrl = url + salesType[0] + "/" + buildingType[i];
        let urlData = await scrapUrlController(browserInstance, buildingUrl);
        for(let j = 0; j < urlData.length; j++){
            let contentData = await scrapContentController(browserInstance, urlData[j]);
            contentData.push({'TypeofSales':salesType[0]},{'TypeofBuilding':buildingType[i]}, {'Link':urlData[j]});
            scrapedData.push(contentData);
        }
    }
    for (let i = 0; i < buildingType.length - 1; i++){
        buildingUrl = url + salesType[1] + "/" + buildingType[i];
        let urlData = await scrapUrlController(buildingUrl);
        for(let j = 0; j < urlData.length; j++){
            let contentData = await scrapContentController(browserInstance, urlData[j]);
            contentData.push({'TypeofSales':salesType[1]},{'TypeofBuilding':buildingType[i]}, {'Link':urlData[j]});
            scrapedData.push(contentData);
        }
    }
    await browserInstance.close();
    return scrapedData;
}
module.exports = {
    scrapAllData
};