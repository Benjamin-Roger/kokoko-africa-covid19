const contentful = require("contentful");
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";

async function fetchCountryDataCMS(countryCode) {
  const client = await contentful.createClient({
    space: process.env.CONTENTFUL_SPACE,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  });

  let data = {};

  await client
    .getEntries({
      content_type: "country",
      "fields.countryCode": countryCode,
    })
    .then((entry) => (data = entry))
    .catch(console.error);

  return data;
}

export async function getCountryDataCMS(countryCode) {
  let data = await fetchCountryDataCMS(countryCode);

  let cleanedData = { found: false };

  if (data.items.length) {
    let { fields, sys } = data.items[0];


    cleanedData = await {
      found: true,
      createdAt: sys.createdAt,
      updatedAt: sys.updatedAt,
      fields: ["toDoBefore", "toDoArrival"].map((type) => {
        return {
          type,
          severity: fields[`${type}Severity`] || "",
          body:documentToHtmlString(fields[`${type}Body`]) || "",
          sources: fields[`${type}Sources`]
            ? fields[`${type}Sources`].map((link) => {
                return { name: link, href: link };
              })
            : [],
        };
      }),
    };
  }


  return cleanedData;
}
