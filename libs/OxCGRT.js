// Get indicator codes with label
var indicatorCodes = require("../data/OxCGRT_codebook.json");

async function getAllOxCGRTData() {
  let data = require("../data/OxCGRT.json");

  return data;
}

export async function getLatestCountryValues(countryCode) {
  // Get all data
  let allData = await getAllOxCGRTData();

  // Filter per country
  let countryData = await allData.filter(
    (item) => item.CountryCode === countryCode
  );

  // Sort data by date
  var countrySortedDailyData = countryData.sort(
    (latest, earliest) => earliest.Date - latest.Date
  );

  // Get the latest day with all indicators available for the country
  const latestCountryData = countrySortedDailyData.find((item) => {
    let valid = true;

    indicatorCodes.forEach((indicator) => {
      if (item[indicator.label] === "" || parseInt(item[indicator.label]) > 4)
        valid = false;
    });

    return valid;
  });

  return latestCountryData;
}

async function getCountryIndicatorValues(countryCode) {
  // return value into a cleaned up object
  let data = await getLatestCountryValues(countryCode);

  if (data) {
    let indicators = indicatorCodes.map((indicator) => {
      return {
        code: indicator.code,
        label: indicator.label,
        description: indicator.description,
        value: parseInt(data[indicator.label]),
        flag: parseInt(data[`${indicator.code}_Flag`]) || null,
      };
    });

    return {
      date: data.Date,
      countryCode: data.CountryCode,
      indicators,
    };
  } else {
    return {
      date: null,
      countryCode: null,
      indicators: [],
    };
  }
}

function getIndicatorLabelCode(indicator) {
  const searchedIndicator = indicatorCodes.find(
    (item) => item.code === indicator.code
  );

  const searchedIndicatorValue = searchedIndicator.coding.find(
    (item) => item.value === indicator.value
  );

  return `${searchedIndicator.code}.level_${searchedIndicatorValue.value}`;
}

function calculateIndicatorScore(indicator) {
  // Get max of the indicator
  const searchedIndicator = indicatorCodes.find(
    (item) => item.code === indicator.code
  );

  const searchedIndicatorMax = Math.max(
    ...searchedIndicator.coding.map((item) => parseInt(item.value))
  );

  // Get flag values of the indicator https://github.com/OxCGRT/covid-policy-tracker/blob/master/documentation/index_methodology.md
  let isFlag = indicator.flag === null ? 0 : 1; // if the flag is not null, it is 1
  let flagValue = indicator.flag === null ? 0 : indicator.flag; // if the flag is null, it returns 0

  let score =
    (indicator.value - 0.5 * (isFlag - flagValue)) / searchedIndicatorMax;

  return score;
}

function calculateAverageIndicatorScore(array) {
  let average = 0;

  const sum = (accumulator, currentValue) => accumulator + currentValue;

  if (array.length > 1) {
    average =
      array.map((indicator) => calculateIndicatorScore(indicator)).reduce(sum) /
      array.length;
  } else {
    average = calculateIndicatorScore(array[0]);
  }

  return average;
}

function getBlockData(codes, data) {
  // Get the indicators of the dataset selected by their codes
  const indicators_array = data.indicators.filter((indicator) =>
    codes.includes(indicator.code)
  );

  //  Calculate the average score of the indices
  let score = calculateAverageIndicatorScore(indicators_array);

  // Compound the labels of the indices into a single description
  let labels = indicators_array.map((indicator) =>
    getIndicatorLabelCode(indicator)
  );

  let description = labels;

  // Return a worded label for color coding
  let score_label = "low";
  if (score > 0.4) score_label = "medium";
  if (score > 0.75) score_label = "high";
  if (score > 0.9) score_label = "critical";

  return {
    score: score,
    severity: score_label,
    body: description,
    sources: [
      {
        name: "Oxford-Blavatnik",
        href:
          "https://www.bsg.ox.ac.uk/research/research-projects/coronavirus-government-response-tracker",
      },
    ],
  };
}

export async function getCountryInfo(countryCode) {
  // Get the data
  const data = await getCountryIndicatorValues(countryCode);

  if (data.countryCode !== null) {
    const countryData = await {
      entrance: getBlockData(["C8"], data),
      localLife: getBlockData(["C1", "C2", "C3", "C4", "H6"], data),
      innerTravel: getBlockData(["C5", "C6", "C7"], data),
    };

    let result = {
      found: true,
      date: data.date,
      countryCode: data.countryCode,
      data: countryData,
    };

    console.log("OxCGRT", data.countryCode);

    return result;
  } else {
    return {
      found: false,
      countryCode: countryCode,
      ...data,
    };
  }
}

import { _ } from "@/libs/i18n";
export function OxCodeToLabels(data, block) {
  return data
    ? data[block.type].body.map((labelCode) => (
        <p key={labelCode}>{_("OxCGRTlabel", labelCode)}</p>
      ))
    : false;
}
