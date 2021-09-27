import Link from "next/link";

import { v4 as uuid } from "uuid";
import { getCountrySlug, getCountryName } from "@/libs/countries";
import { getAllGeometries } from "@/libs/geometries";

import { SEO } from "@/components/common/SEO";

import { withTranslation } from "@/libs/i18n";

function CountriesPage(props) {
  const { geometries, t } = props;

  return (
    <>
      <SEO title="Find a country" />

      <section className="container">
        <h1 className="decorated">{t("searchByCountry")}</h1>
        <div className="countryWrapper mt-10">
          <ul className="m-0 grid grid-cols-2 gap-2 lg:grid-cols-4">
            {geometries
              .sort((a, b) => {
                if (a.name > b.name) {
                  return +1;
                } else {
                  return -1;
                }
              })
              .map((geo) => (
                <li
                  className="list-none w-full h-inherit flex items-center w-full block bg-gradient-to-b from-ko-blue-300 to-ko-blue-200 rounded"
                  key={uuid()}
                >
                  <Link href={geo.slug}>
                    <a className="px-4 py-3 block duration-150 w-full hover:pl-6">
                      {geo.name}
                    </a>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </section>
    </>
  );
}

export async function getStaticProps({ params, locale }) {
  // Get all country names and links

  const allGeometries = getAllGeometries();

  var geometries = allGeometries.map((geo) => {
    return {
      name: getCountryName(geo, locale),
      slug: "/country/" + getCountrySlug(geo, locale),
    };
  });

  return {
    props: {
      geometries,
    },
  };
}

export default withTranslation('nav')(CountriesPage);
