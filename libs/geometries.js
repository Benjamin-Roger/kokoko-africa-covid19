import { getCountrySlug } from "@/libs/countries";

export function getAllGeometries() {
  // Get the geometries array from the countries.json file
  const { geometries } = require("@/data/countries.json").objects.layer;

  return geometries;
}

export function getCurrentGeometry(slug, locale) {
  const geometries = getAllGeometries();

  const currentGeometryArray = geometries.filter(
    (geometry) => getCountrySlug(geometry, locale) === slug
  );

  return currentGeometryArray ? currentGeometryArray[0] : {};
}
