const fs = require("fs");

const { join } = require("path");
const moment = require("moment-mini");

// require csvtojson module
const CSVToJSON = require("csvtojson");

const got = require("got");
const { createWriteStream } = require("fs");
const stream = require("stream");
const { promisify } = require("util");
const { PassThrough } = require("stream");
const pipeline = promisify(stream.pipeline);

async function fetchLastOxCGRTfile() {
  const url =
    "https://raw.githubusercontent.com/OxCGRT/covid-policy-tracker/master/data/OxCGRT_latest.csv";
  const fileName = join(
    process.cwd(),
    `/data/raw/OxCGRT_${moment(Date.now()).format("DDMMYYYY")}.csv`
  );

  const downloadStream = got.stream(url);
  const fileWriterStream = createWriteStream(fileName);

  downloadStream.on("downloadProgress", ({ transferred, total, percent }) => {
    const percentage = Math.round(percent * 100);
    console.error(`progress: ${transferred}/${total} (${percentage}%)`);
  });

  (async () => {
    try {
      await pipeline(downloadStream, fileWriterStream).then(() => {
        console.log(`File downloaded to ${fileName}`);

        cleanOxCGRTdata(fileName);
      });
    } catch (error) {
      console.error(`Something went wrong. ${error.message}`);
    }
  })();
}

async function cleanOxCGRTdata(path) {
  try {
    // Get African country codes
    let countryCodes = await getAllCountryCodes();

    // Read the file with OxCGRT data
    const data = await CSVToJSON().fromFile(path);

    // Only keep news 15 days old maximum
    let lastMonthMoment = moment(Date.now()).subtract(15, "days");

    // Format to OxCGRT date format
    let recentDate =
      moment(lastMonthMoment).format("YYYY") +
      moment(lastMonthMoment).format("MM") +
      moment(lastMonthMoment).format("DD");

    // Filter by country and date
    let recentData = await data
      .filter((item) => countryCodes.includes(item.CountryCode))
      .filter((item) => item.Date > recentDate);

    let jsonData = await JSON.stringify(recentData);

    // Save in the data folder for the static build
    let outputFile = join(process.cwd(), "/data/OxCGRT.json");

    await fs.writeFile(outputFile, jsonData, "utf8", function (err) {
      if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
      }

      console.log("JSON file has been saved.");
    });

    // return the JSON array
    return data;
  } catch (err) {
    console.log(err);
  }
}

function getAllCountryCodes() {
  // Get indicator codes with label
  let countryCodesRaw = require("../data/countries.json");

  let countryCodesArray = countryCodesRaw.objects.layer.geometries.map(
    (geo) => geo.properties.iso_a3
  );
  return countryCodesArray;
}

async function extractAllOxCGRTData() {
  try {
    if (process.env.ENV === "dev") {
      //pass;
    } else {
      await fetchLastOxCGRTfile();
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  extractAllOxCGRTData: extractAllOxCGRTData(),
};
