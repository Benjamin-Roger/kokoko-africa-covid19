import Image from "next/image";

import { SEO } from "@/components/common/SEO";

import MapContainer from "@/components/layout/MapContainer/MapContainer";
import AnimatedPlane from "@/components/layout/AnimatedPlane";
import HomeHeroCountryCarousel from "@/components/home/HomeHeroCountryCarousel";
import HomeCard from "@/components/home/HomeCard";
import SearchCountryInput from "@/components/home/SearchCountryInput";

import Button from "@material-ui/core/Button";
import FlightTakeoffIcon from "@material-ui/icons/FlightTakeoff";

import theme from "@/libs/theme";

import { withTranslation } from "@/libs/i18n";

function IndexPage({ locale, t }) {
  const { attributes, html } = require(`../markdown/index.${locale}.md`);

  return (
    <>
      <SEO title={attributes.title} description={attributes.description} />
      <section className="container hero grid lg:grid-cols-12 mt-6 mb-20">
        <div className="lg:col-span-8 flex items-center">
          <div>
            <h1>{attributes.title}</h1>
            <p className="text-2xl text-ko-green-100 font-normal">
              {attributes.subtitle}
            </p>

            <div
              className="markdown mt-3 mb-8"
              dangerouslySetInnerHTML={{ __html: html }}
            />

            <HomeHeroCountryCarousel />

            <div className="flex gap-2 flex-col md:flex-row flex-wrap mb-12 bg-ko-blue-900">
              <div className="md:flex-1">
                <SearchCountryInput dark />
              </div>
              <div className="w-42 inline">
                <p className="font-bold mx-3 text-center my-4 md:my-1 md:inline-block">
                  {t("or")}
                </p>
                <Button
                  href="#map"
                  style={{
                    backgroundColor: theme.colors.severity.low,
                    color: theme.colors["ko-blue"][900],
                    padding: `${theme.height[4]} ${theme.width[5]}`,
                    fontWeight: "bold",
                    "&:hover": {
                      transform: "translateY(10px)",
                    },
                  }}
                  color="primary"
                  variant="contained"
                  className="flex items-center w-full md:w-auto"
                >
                  <FlightTakeoffIcon className="mr-3 animate-pulse" />
                  {t("searchButton")}
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden lg:block lg:col-span-4 relative">
          <div className="plane h-full relative">
            <AnimatedPlane />
          </div>
        </div>
      </section>

      <hr className="md:hidden border-transparent py-16" />

      <section className="mt-10 pt-10 relative pb-5">
        <div className="container">
          <h2 className="text-ko-green-100 mb-12 text-center">
            {t("cardSectionTitle")}
          </h2>
          <div className="flex gap-12 lg:gap-20  justify-center flex-wrap text-center">
            <HomeCard icon="entrance" title={t("enter.title")}>
              {t("enter.body")}
            </HomeCard>
            <HomeCard icon="toDoBefore" title={t("immigration.title")}>
              {t("immigration.body")}
            </HomeCard>
            <HomeCard icon="localLife" title={t("localLife.title")}>
              {t("localLife.body")}
            </HomeCard>
            <HomeCard icon="innerTravel" title={t("innerTravel.title")}>
              {t("innerTravel.body")}
            </HomeCard>
            <HomeCard icon="stats" title={t("stats.title")}>
              {t("stats.body")}
            </HomeCard>
            <HomeCard icon="news" title={t("news.title")}>
              {t("news.body")}
            </HomeCard>
          </div>
        </div>
        <div className="absolute bg-ko-gray-light h-1/4 w-full bottom-0 z-negative w-full"></div>
      </section>

      <section
        className="bg-ko-gray-light text-ko-blue-900 py-10 overflow-x-hidden md:overflow-visible"
        id="map"
      >
        <div className="container">
          <div className="flex flex-col-reverse md:flex-row">
            <aside className="md:flex-6 relative">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="735.146"
                  height="655.082"
                  viewBox="0 0 735.146 655.082"
                  className="object-contain transform rotate-90"
                >
                  <path
                    d="M467.3,4802.517c-107.125,118.914-152.048,483.586-66.165,521.9s367.314,25.1,400.346-114.95-31.711-338.246-67.385-397.7S574.424,4683.6,467.3,4802.517Z"
                    transform="matrix(-0.391, 0.921, -0.921, -0.391, 5234.946, 1759.93)"
                    fill={theme.colors["ko-blue"][100]}
                  />
                </svg>
              </div>
              <div
                className="absolute w-full h-full top-0 z-0"
                style={{ height: "500px" }}
              >
                <MapContainer scale={250} variant="dark" />
              </div>
            </aside>
            <div className="md:flex-4 h-inherit flex">
              <div className="mt-20 w-full">
                <h2 className="text-3xl">
                  {t("mapSection.title")}
                  <br />
                  <span className="text-xl text-ko-blue-200 font-normal">
                    {t("mapSection.subTitle")}
                  </span>
                </h2>
                <p className="mb-5">{t("mapSection.body")}</p>
                <SearchCountryInput />
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>
        {`
          .hero {
            min-height: 400px;
            height: 80vh;
            max-height: 1000px;
          }
        `}
      </style>
    </>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      locale,
    },
  };
}

export default withTranslation("index")(IndexPage);
