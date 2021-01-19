const fs = require("fs");
const json2csv = require("json2csv");
const { Parser } = json2csv;

const csvWriter = (dataRes) => {
  //  if(JSON.stringify(dataRes.data.result.products))
  for (let i = 0; i < dataRes.length; i++) {
    if (dataRes[i].data.statusCode > 299) {
      throw err;
    } else {
      writeCSV(i);
    }
  }

  function writeCSV(index) {
    let stringifyData = dataRes[index].data.result.products;

    // Here we can had any field that we want from the products array response (for example "title" is Producuts[i].title)
    const fields = [
      "title",
      "matchingScores.titleMatchingScore",
      "price.amount",
      "category",
      "attributes.Brand",
      "attributes.model",
    ];
    const json2csvParser = new Parser({
      fields,
      defaultValue: "",
      includeEmptyRows: true,
    });

    const csv = json2csvParser.parse(stringifyData);
    fs.writeFile("data.csv", csv, function (err) { // ### Change output path and file name here: ###
      if (err) throw err;
      console.log("File Saved!");
    });
  }
};

module.exports.csvWriter = csvWriter;