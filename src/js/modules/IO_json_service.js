import fs from 'fs'

function readDB(tableFilename) {
    try {
        const data = fs.readFileSync(tableFilename, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error("Failed to read data:", err);
        return null;
    }
}

function writeDB(data, tableFilename) {
    if (!data) return console.error('No data Found');
    try {
        fs.writeFileSync(tableFilename, JSON.stringify(data));
        console.log("Data Saved");
    } catch (err) {
        console.error("Failed to write data:", err);
    }
}

function updateDB(updatedRecord, tableFilename, uniqueIdentifier = 'id') {
    const existingData = readDB(tableFilename);

    if (!existingData) {
        console.error('No existing data found.');
        return;
    }
    const indexToUpdate = existingData.findIndex(record => record[uniqueIdentifier] === updatedRecord[uniqueIdentifier]);

    if (indexToUpdate === -1) {
        console.error('Record not found for update.');
        return;
    }
    existingData[indexToUpdate] = { ...existingData[indexToUpdate], ...updatedRecord };
    writeDB(existingData, tableFilename);
}

export { readDB, writeDB, updateDB };