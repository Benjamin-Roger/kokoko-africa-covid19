export async function getCountryStats(countryCode) {
  let data = {};

  // Initialize data
  data = {
    found: true,
    values: {
      confirmedCases: 0,
      confirmedDeaths: 0,
      totalPopulation: 0,
    },
  };

  // Get latest population data
  let resPop = await fetch(
    `https://dataportal.opendataforafrica.org/api/2.0/data?datasetId=fuvkwwf&country-name=${countryCode}`
  ).then((res) => res.text()); // convert to plain text

  let dataPop = await JSON.parse(resPop.trim());

  if (
    countryCode == "-99" || //Somaliland
    dataPop === undefined ||
    dataPop.data === undefined ||
    dataPop.data.length === 0 ||
    typeof dataPop !== "object"
  ) {
    data.found = false;
  } else {
    data.values.totalPopulation = await dataPop.data[0]["population"];

    // If the request returns undefined, then we cannot find data on this country

    //Open data for Africa - Covid
    let resCovid = await fetch(
      `https://africacovid.opendataforafrica.org/api/2.0/data?datasetId=hvrtqf&indicator=KN.A1,KN.A2&region=${countryCode}`
    );

    try {
      let dataCovid = await resCovid.json();

      // Confirmed cases (KN.A1 code)
      let confirmedCasesTimeline = await dataCovid.data.filter(
        (dataset) => dataset.indicator.id === "KN.A1"
      )[0].values;

      data.values.confirmedCases = await confirmedCasesTimeline[
        confirmedCasesTimeline.length - 1
      ];

      // Confirmed deaths (KN.A2 code)
      let confirmedDeathsTimeline = await dataCovid.data.filter(
        (dataset) => dataset.indicator.id === "KN.A2"
      )[0].values;

      data.values.confirmedDeaths = await confirmedDeathsTimeline[
        confirmedDeathsTimeline.length - 1
      ];

      // Return a worded label for color coding
      let severity = "low";
      const infectionRate =
        data.values.confirmedCases / data.values.totalPopulation;
      if (infectionRate > 0.005) severity = "medium";
      if (infectionRate > 0.015) severity = "high";
      if (infectionRate > 0.03) severity = "critical";

      data.values.score = infectionRate;
      data.values.severity = severity;

      // Add last update date
      data.lastUpdate = dataCovid.data[0].endDate;

    } catch (error) {
      console.log("ODFA error",error);

      data.values.confirmedCases = "N/A";
      data.values.confirmedDeaths = "N/A";
      data.values.severity = "Unknown";
    }
  }

  // Return the country code

  data.countryCode = countryCode;

  console.log("ODFA", data.countryCode);

  return data;
}
