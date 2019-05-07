const jsonDiffPatch = require("jsondiffpatch").create();
const fs = require("fs");

module.exports = async function csvToJsonDiff(
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

    // Write output to specific file
    fs.writeFile(
        options.outputFilePath,
        JSON.stringify(jsonDiffPatch.diff(file1, file2)),
        err => {
            if (err) console.error(err);
        }
    );
};
