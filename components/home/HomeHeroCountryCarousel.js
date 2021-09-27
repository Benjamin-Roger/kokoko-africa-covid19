import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import { Fade } from "@material-ui/core";

import { getAllCountries } from "@/libs/countries";

import theme from "@/libs/theme";

import { withTranslation } from "@/libs/i18n";

let colors = Object.keys(theme.colors.ryg).map((color) => color);

const HomeHeroCountryCarousel = ({ t }) => {
  const { locale } = useRouter();
  let countries = getAllCountries(locale);

  const initialCountry = {
    name: countries[7].name,
    slug: countries[7].slug,
    color: colors[1],
  };

  const [country, setCountry] = useState(initialCountry); // country to show in the carousel
  const [animation, toggleAnimation] = useState(true); // animation to launch with a set timeout

  const getRandomItem = (arr) => {
    return arr[Math.round(Math.random() * (arr.length - 1))];
  };

  useEffect(() => {
    countries = getAllCountries(locale);

    if (country) {
      const interval = setInterval(() => {
        toggleAnimation(false);

        setTimeout(() => {
          let randomCountry = getRandomItem(countriesNoRepeatArr);

          setCountry({
            name: randomCountry.name,
            slug: randomCountry.slug,
            color: getRandomItem(colorsNoRepeatArr),
          });
        }, 500);

        setTimeout(() => toggleAnimation(true), 500);
      }, 3000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [country]);

  // Remove the current color and country from the randomized choice
  const colorsNoRepeatArr = colors.filter((color) => color !== country.color);
  const countriesNoRepeatArr = countries.filter(
    (cou) => cou.name !== country.name
  );

  const countryString = (
    <>
      <Fade in={animation}>
        <span>
          <Link href={`/country/${country.slug}`}>
            <a className={`break-normal text-ryg-${country.color}`}>
              {country.name}
            </a>
          </Link>
        </span>
      </Fade>
    </>
  );

  return (
    <>
      <p className="text-2xl lg:text-3xl break-normal font-bold mb-5">
        {t("canwego")} {countryString} ?
      </p>
    </>
  );
};

export default withTranslation("index")(HomeHeroCountryCarousel);
