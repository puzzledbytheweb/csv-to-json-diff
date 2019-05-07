const { CSVUtils } = require("./lib");
const jsonDiffPatch = require("jsondiffpatch").create({
    arrays: {
        includeValueOnMove: true
    }
});

const diffPluginSaveId = require("./utils/diffPlugins/diffPluginSaveId");

const fs = require("fs");

const { readCSVFile } = CSVUtils;

async function runReadLogic(
    file1,
    file2,
    options = {
        sort: undefined,
        plugins: [{ plugin: null, before: null }],
        outputFilePath: null
    }
) {
    // Sort the files based in user provided function
    file1.sort(options.sort);
    file2.sort(options.sort);

    // Prepare every plugin
    options.plugins.forEach(pluginEntry => {
        jsonDiffPatch.processor.pipes.diff.before(
            pluginEntry.before,
            pluginEntry.plugin
        );
    });

    fs.writeFile(
        options.outputFilePath,
        JSON.stringify(jsonDiffPatch.diff(file1, file2)),
        err => {
            if (err) console.error(err);
        }
    );
}

function sortingFunction(element1, element2) {
    return element1["EAN"] - element2["EAN"];
}

async function start() {
    const file1 = await readCSVFile("MOCK_DATA.csv");
    const file2 = await readCSVFile("MOCK_DATA1.csv");

    runReadLogic(file1, file2, {
        sort: sortingFunction,
        plugins: [{ plugin: diffPluginSaveId, before: "collectChildren" }],
        outputFilePath: "test.json"
    });
}

start();
