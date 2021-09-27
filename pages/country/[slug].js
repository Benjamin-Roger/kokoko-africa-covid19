import Image from "next/image";

import MapLayout from "@/components/layout/MapLayout";
import InternationalTravelSection from "@/components/country/InternationalTravelSection";
import LocalLifeSection from "@/components/country/LocalLifeSection";
import CovidSection from "@/components/country/CovidSection";

import { getCurrentGeometry, getAllGeometries } from "@/libs/geometries";
import { getCountrySlug, getCountryName } from "@/libs/countries";
import { toKebabCase } from "@/libs/toKebabCase";
import { getCountryStats } from "@/libs/odfa";
import { getCountryInfo } from "@/libs/OxCGRT";
import { getCountryMeasures } from "@/libs/acaps";
import { getCountryDataCMS } from "@/libs/contentful";


import { SEO } from "@/components/common/SEO";

import { withTranslation } from "@/libs/i18n";

import { translateFromEnIbm } from "@/libs/ibmTranslate";

function CountryPage(props) {
  const { name, dataOxCGRT, dataODFA, dataAcaps, dataCMS, flag, t } = props;

  const title = t("title",{name});

  return (
    <>
      <SEO
        title={title}
        description={t("SEODescription",{name})}
      />

      <section className="container">
        <MapLayout>
          <span className=" mb-4 items-center md:flex">
            <div className="w-8 h-8 md:w-12 md:h-12 relative inline-block ">
              <Image
                layout="fill"
                quality={50}
                alt={name}
                title={name}
                priority={true}
                src={`/images/flag/${flag}.svg`}
                className="object-contain"
              />
            </div>
            <h1 className="mb-0 ml-2 text-3xl md:text-4xl inline">{title}</h1>
          </span>

          <InternationalTravelSection {...{ dataOxCGRT, name, dataCMS }} />

          <LocalLifeSection {...dataOxCGRT} {...{ name }} />

          <CovidSection {...{ dataODFA, dataAcaps }} />
        </MapLayout>
      </section>
    </>
  );
}

export async function getStaticProps({ params, locale }) {
  // Get the current country from the TopoJson file, identified with the slug
  const { slug } = params;
  const currentGeometry = getCurrentGeometry(slug, locale);

  let code_a2 = await currentGeometry.properties.iso_a2;

  let code_a3 = currentGeometry.properties.iso_a3;

  // Get data for stats block from the Open Data for Africa
  let dataODFA = await getCountryStats(code_a2);

  // Get data for international travel, national movements and daily life from OxCGRT datasets
  let dataOxCGRT = await getCountryInfo(code_a3);

  // Get data from ACAPS for the latest measures
  let dataAcaps = await getCountryMeasures(code_a3);

  // Get data from Contentful for the visa measures
  let dataCMS = await getCountryDataCMS(code_a3);

  // Get country name from the topoJson file
  let name = getCountryName(currentGeometry, locale);

  // // Translate ACAPs content to local language with IBM translate API
  if (dataCMS.fields && process.env.ENV !== "dev")
    dataCMS.fields[0].body =
      locale !== "en"
        ? await translateFromEnIbm(
            dataCMS.fields[0].body,
            locale
          )
        : dataCMS.fields[0].body;
  if (dataCMS.fields)
    dataCMS.fields[1].body =
      locale !== "en"
        ? await translateFromEnIbm(
            dataCMS.fields[1].body,
            locale
          )
        : dataCMS.fields[1].body;

  //  Translate ACAPs content to local language with IBM translate API

  if (dataAcaps.found && locale !== "en") {
    const translateMeasures = async (measure) => {
      //a function that returns a promise

      const [title, body] = await translateFromEnIbm(
        [measure.title, measure.body],
        locale
      );

      let translatedMeasure = {
        ...measure,
        title,
        body,
      };

      return translatedMeasure;
    };

    const asyncTranslate = async (measure) => {
      return translateMeasures(measure);
    };

    const getData = async () => {
      return Promise.all(
        dataAcaps.results.map((measure) => asyncTranslate(measure))
      );
    };

    await getData().then((data) => {
      dataAcaps.results = data;
    });
  }

  return {
    props: {
      name,
      flag: toKebabCase(currentGeometry.properties.name_long),
      dataOxCGRT,
      dataODFA,
      dataAcaps,
      dataCMS,
      slug,
      locale,
    },
  };
}

export async function getStaticPaths({ locales }) {
  const geometries = getAllGeometries();

  const paths = [];

  // Push the paths for each geometry
  geometries.map((geo) => {
    // Push the paths for each locale
    locales.map((locale) => {
      paths.push({
        params: {
          slug: getCountrySlug(geo, locale),
        },
        locale,
      });
    });
  });

  return {
    paths,
    fallback: false,
  };
}

export default withTranslation("country")(CountryPage);
