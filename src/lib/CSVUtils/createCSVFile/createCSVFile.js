const json2csv = require("json2csv");
const fs = require("fs");

function createCSVFile(object, path) {
    // Checking if is undefined
    if (!object) {
        object = {
            error: "Object came as undefined in function createCSVFile"
        };
    }

    return new Promise((resolve, reject) => {
        const fields = Object.keys(object[0]);
        const csv = json2csv.parse(object, { fields, header: false });

        fs.writeFile(path + ".csv", csv, err => {
            if (err) {
                reject(err);
            }

            resolve("File successfuly written!");
        });
    });
}

module.exports = createCSVFile;
