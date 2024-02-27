const path = require('node:path');
var avro = require('avro-js');

async function main() {
    let filePath = path.resolve('./users.avro');

    avro.createFileDecoder(filePath)
        .on('metadata', function (type) { 
            console.log(type);
         })
        .on('data', function (record) {
            console.log(record);
        });
}

main();