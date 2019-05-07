const csvToJsonDiff = require("../index");

const { CSVUtils } = require("../lib");
const { readCSVFile } = CSVUtils;

const { saveIdPlugin } = require("../plugins/");

function sortingFunction(element1, element2) {
    return element1["EAN"] - element2["EAN"];
}

async function basicExample() {
    const file1 = await readCSVFile("MOCK_DATA.csv");
    const file2 = await readCSVFile("MOCK_DATA1.csv");

    csvToJsonDiff(file1, file2, {
        sort: sortingFunction,
        plugins: [{ plugin: saveIdPlugin, before: "collectChildren" }],
        outputFilePath: "test.json"
    });
}

basicExample();
