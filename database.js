const {Client} = require('pg')

const client = new Client({
    host: '127.0.0.1',
    user: 'postgres',
    database: 'postgres',
    password: 'Yourgame1@',
    port: 5432,
});

let fieldName = [];
const getFieldName = async () => {
    res = await client.query('SELECT * FROM data');
    field = res.fields.map(getName);
    // await client.end(); 
    return field;
}
function getName(field) {
    return field.name ;
}
const addColumn = async (colName) => {
    // await client.query(`ALTER TABLE "data" ADD "www" VARCHAR(255);`)
	const query = `ALTER TABLE "data"
				   ADD "${colName}" VARCHAR(255);`;
    await client.query(query);
    
};
async function addScrapedData(scrapData) {
    await client.connect();
    fieldName = await getFieldName();
    for (let i = 0; i < scrapData.length; i++){
        await addRecord(scrapData[i]);
    }
    await client.end();
}
const addRecord = async(record) => {
    await checkField(record);
    query = "INSERT INTO data (";//(title) VALUES ('test7')"
    let fName = Object.keys(record[0])[0].toLowerCase().replaceAll(' ', '_');
    let value = "'" + record[0][Object.keys(record[0])[0]] + "'";
    for (let j = 1; j < record.length; j++){
        fName += ' ,' + Object.keys(record[j])[0].toLowerCase().replaceAll(' ', '_');
        value += ' ,' + "'" + record[j][Object.keys(record[j])[0]] + "'";
    }
    query += fName + ') VALUES (' + value + ')';
    await client.query(query);

}
const checkField = async (record) =>{
    for (let i = 0; i < record.length; i++){
        let val = false;
        let keyVal = Object.keys(record[i])[0].toLowerCase().replaceAll(' ', '_');
        for(let j = 0; j < fieldName.length; j++){            
            if (keyVal == fieldName[j]){
                val = true;
                break;
            }
        }
        if (val == false){
           await addColumn(keyVal.toLowerCase().replaceAll(' ', '_'));
           fieldName.push(keyVal.toLowerCase().replaceAll(' ', '_'));
        }
    }

}
module.exports = {
    addScrapedData: (data) => addScrapedData(data)
};
