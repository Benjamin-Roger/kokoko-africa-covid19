import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";

import { v4 as uuid } from "uuid";

import TextField from "@material-ui/core/TextField";

import Signature from "@/components/common/Signature";
import MaterialIconButton from "@/components/home/MaterialIconButton";

import theme from "@/libs/theme";
import { getAllCountries } from "@/libs/countries";
import {withTranslation} from "@/libs/i18n"

const SearchCountryInput = ({ dark, t }) => {
  const router = useRouter();
  const { locale } = router;

  const countries = getAllCountries(locale);

  // Manage search engine
  const [value, setValue] = useState("");

  const countryResults = countries
    .filter((country) =>
      country.name.toLowerCase().includes(value.toLowerCase())
    )
    .sort((a, b) => b.name - a.name);

  const handleClick = () => {
    if (firstSlug) {
      router.push(firstSlug);
      window.scrollTo(0, 0);
    }
  };

  const firstSlug = countryResults.length
    ? `/country/${countryResults[0].slug}`
    : "";

  return (
    <>
      <div className="flex relative">
        <TextField
          value={value}
          onChange={(e) => setValue(e.target.value)}
          label={t("whereToGoLabel")}
          variant="filled"
          className="w-full"
          style={{
            backgroundColor: theme.colors["ko-gray"].light,
            borderRadius: theme.borderRadius.md,
            color: theme.colors["ko-blue-900"],
          }}
          InputProps={{
            endAdornment: (
              <MaterialIconButton
                icon="search"
                disabled={!firstSlug}
                onClick={handleClick}
                aria-label="Search"
              />
            ),
          }}
        />

        <Signature side={"right"} rounded={true} />
      </div>

      {countryResults.length >= 1 && value.length >= 3 ? (
        <ul className={`flex flex-wrap list-inside ml-0 duration-150 mt-5`}>
          {countryResults.map((country) => (
            <li className="list-none mr-3 my-2" key={uuid()}>
              <Link href={`/country/${country.slug}`}>
                <a
                  className="list-none rounded-full px-3 py-2 bg-ko-blue-100 duration-150 hover:bg-ko-blue-300 hover:text-white animate-pulse"
                  title={country.name}
                  alt={country.name}
                >
                  {country.name}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        ""
      )}
    </>
  );
};

export default withTranslation('components')(SearchCountryInput);
