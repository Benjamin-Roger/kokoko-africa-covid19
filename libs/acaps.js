let token = "";

async function getAcapsToken() {
  //Post credentials to get an authentication token
  let credentials = JSON.stringify({
    username: process.env.ACAPS_USERNAME,
    password: process.env.ACAPS_PASSWORD,
  });

  let res = await fetch("https://api.acaps.org/api/v1/token-auth/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: credentials,
  });

  let dataToken = await res.json();

  return dataToken["token"];
}

export async function getAllCountryMeasures(countryCode) {
  token = token ? token : await getAcapsToken();

  let acapsHeaders = {
    Accept: "application/json",
    "X-CSRFToken": process.env.ACAPS_XCSRF,
    Authorization: `Token ${token}`,
  };

  let url = `https://api.acaps.org/api/v1/government-measures/?page=1&region=Africa&ordering=-entry_date&iso=${countryCode}`;

  let data = {}

  async function fetchAcapsData() {
    await fetch(url, {
      method: "GET",
      credentials: "include",
      headers: new Headers(acapsHeaders),
    }).then(async (res) => {
      const json = await res.json();

      if (json.results && json && res) {
        // only continue if there are results
        data = json;

      } else {
        // If the returned json does not have a results key or has a detail field (indicating error message due to throttle), it restarts the fetch
        await fetchAcapsData();
      }

    });

  }

  await fetchAcapsData();

  await console.log("Data ACAPS ", countryCode, data.count || data.details || "");
  return data;
}

export async function getCountryMeasures(countryCode) {
  let data = await getAllCountryMeasures(countryCode);

  try {
    // if (data.detail) { // not necessary as the throttle logic is in getAllCountryMeasures
    //   console.log(
    //     "ACAPS : A 50s timeout has been set to avoid ACAPS API throttling."
    //   );

    //   setTimeout(async () => {
    //     data = await getAllCountryMeasures(countryCode);
    //   }, 50 * 1000);
    // }

    let results = await data.results
      .filter((result) => {
        // Remove the posts related to some categories
        var excludedCategories = ["Governance and socio-economic measures"];
        var isIncluded = true;
        var i = 0;
        while (isIncluded && i < excludedCategories.length) {
          if (result.category.includes(excludedCategories[i])) {
            isIncluded = false;
          }
          i++;
        }

        return isIncluded;
      })
      .sort((earliest, latest) => latest.id - earliest.id)
      .slice(0, 6)
      .map((result) => {
        return {
          id: result.id,
          title: result.measure,
          body: result.comments,
          implementedDate: result.date_implemented,
          postDate: result.entry_date,
          source: {
            name: result.source,
            href: result.link,
          },
        };
      });

    var cleanedData = await {
      ...data,
      results,
      detail: "Data received",
      found: true,
      countryCode,
    };

    return cleanedData;
  } catch (error) {
    console.log("Error with ACAPS: ", error);
    console.log("Received data causing error: ", data);

    var cleanedData = {
      results: [],
      detail: "Data not found",
      found: false,
      countryCode,
    };

    return cleanedData;
  }
}
