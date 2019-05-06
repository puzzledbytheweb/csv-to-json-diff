const { CSVUtils } = require("./lib");
const jsonDiffPatch = require("jsondiffpatch").create({
    arrays: {
        includeValueOnMove: true
    }
});

const fs = require("fs");

const { readCSVFile, createCSVFile } = CSVUtils;

function sortingFunction(element1, element2) {
    return element1["EAN"] - element2["EAN"];
}

async function runReadLogic() {
    const file1 = await readCSVFile("MOCK_DATA.csv");
    const file2 = await readCSVFile("MOCK_DATA1.csv");

    // Sort the files based in EAN
    file1.sort(sortingFunction);
    file2.sort(sortingFunction);

    fs.writeFile(
        "test.json",
        JSON.stringify(jsonDiffPatch.diff(file1, file2)),
        err => {
            if (err) console.error(err);
        }
    );
}

runReadLogic();
