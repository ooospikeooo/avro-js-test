const path = require('node:path');
const avro = require('avro-js');
const assert = require('assert')

async function main() {
    let type = avro.parse({
        type: 'record',
        name: 'Person',
        fields: [
            { name: 'name', type: 'string' },
            { name: 'age', type: 'int' }
        ]
    });
    
    let outPath = path.resolve('./Person.avro');

    console.log(outPath);
    let encoder = avro.createFileEncoder(outPath, type);
    encoder.write({ name: 'Ann', age: 32 });
    encoder.end({ name: 'Bob', age: 33 });

    var n = 0;
    encoder.getDownstream().on('finish', function () {
        avro.createFileDecoder(outPath)
            .on('data', function (obj) {
                n++;
                assert(type.isValid(obj));
                console.log(obj);
            })
            .on('end', function () {
                assert.equal(n, 2);
            });
    });
}

main();