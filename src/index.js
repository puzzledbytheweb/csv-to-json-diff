const { CSVUtils } = require("./lib");
const jsonDiffPatch = require("jsondiffpatch");

const { readCSVFile, createCSVFile } = CSVUtils;

async function runReadLogic() {
    const file1 = await readCSVFile("MOCK_DATA.csv");
    const file2 = await readCSVFile("MOCK_DATA1.csv");

    console.log(jsonDiffPatch.diff(file1, file2));

    // createCSVFile(await readCSVFile("MOCK_DATA.csv"), "newCSV");
}

runReadLogic();
