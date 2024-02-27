const path = require('node:path');
var avro = require('avro-js');

async function main() {
    let filePath = path.resolve('./Person.avsc');

    // var type = avro.parse(filePath);
    var type = avro.parse({
        name: "Person",
        type: "record",
        fields: [
          {name: "name", "type": "string"},
          {name: "age", "type": ["null", "int"], "default": null},
          {
            name: "gender",
            type: {name: "Gender", type: "enum", symbols: ["FEMALE", "MALE"]}
          },
          {
            name: "address",
            type: {
              name: "Address",
              type: "record",
              fields: [{name: "zipcode", type: "string"}]
            }
          }
        ]
      });
    console.log(type);

    var person = {name: 'Bob', gender: "MALE", address: {zipcode: '02139'}};
    let buf = type.toBuffer(person);

    console.log(buf);
}

main();