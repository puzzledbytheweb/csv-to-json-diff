const { CSVUtils } = require("./lib");

const { readCSVFile, createCSVFile } = CSVUtils;

async function runReadLogic() {
    return await readCSVFile("MOCK_DATA.csv");
}
