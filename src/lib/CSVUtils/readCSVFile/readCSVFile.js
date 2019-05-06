const parse = require("csv-parse");
const fs = require("fs");

function readCSVFile(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, "utf8", (err, data) => {
            if (err) {
                reject(err);
            }

            const output = [];

            parse(data, {
                trim: true,
                skip_empty_lines: true
            })
                // Can't use arrow function because of this
                .on("readable", function() {
                    let record;

                    while ((record = this.read())) {
                        output.push(record);
                    }
                })
                .on("end", function() {
                    resolve(output);
                });
        });
    });
}

module.exports = readCSVFile;
