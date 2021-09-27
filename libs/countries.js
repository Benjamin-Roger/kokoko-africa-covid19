import { toKebabCase } from "@/libs/toKebabCase";

import { getAllGeometries } from "@/libs/geometries";

export function getCountryName(geo, locale) {
  if (locale === "fr") return geo.properties[`formal_fr`];
  if (locale === "en") return geo.properties[`name_long`];
}

export function getCountrySlug(geo, locale) {
  return toKebabCase(getCountryName(geo, locale));
}

export function getSubregionFromSlug(slug, locale) {
  let geometries = getAllGeometries();

  let country = slug ? geometries.find((geo) => getCountrySlug(geo, locale) === slug) : false;

  return country ? country.properties.subregion : "";
}

export function getAllCountries(locale) {
  let geometries = getAllGeometries();

  let countries = geometries.map((geo) => {
    return {
      name: getCountryName(geo, locale || "en"),
      slug: getCountrySlug(geo, locale || "en"),
    };
  });

  return countries;
}

export function getSubRegionCoordinates(subregion) {
  const defaultInitialCoordinates = [20, 0];
  switch (subregion) {
    case "Western Africa":
      return [2.5, 16];
    case "Northern Africa":
      return [12, 17];
    case "Southern Africa":
      return [29, -15];
    case "Middle Africa":
      return [18.5, 3.7];
    case "Eastern Africa":
      return [37, -4];

    default:
      return defaultInitialCoordinates;
  }
}
