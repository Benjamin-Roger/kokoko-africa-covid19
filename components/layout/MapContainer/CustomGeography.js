import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import CustomToolTip from "./CustomToolTip";

import { getCountrySlug, getCountryName } from "@/libs/countries";

import { Geography } from "react-simple-maps";

// Import theme colors
import theme from "@/libs/theme.js";
const { colors } = theme;

const currentFill = colors["ko-green"][100];
const defaultFill = colors["ko-blue"][200];
const hoverGradient = "url(#defaultGradient)";

const CustomGeographyLink = React.forwardRef(function CustomGeographyLink(
  props,
  ref
) {
  const { locale } = useRouter();

  const { href, onClick, geo, children } = props;

  return (
    <>
      <CustomToolTip title={getCountryName(geo, locale)}>
        <a
          className="focus:outline-none outline-none z-10"
          onClick={onClick}
          href={href}
          alt={getCountryName(geo, locale)}
          ref={ref}
        >
          <span className="absolute text-transparent pointer-none">
            {getCountryName(geo, locale)}
          </span>
          {children}
        </a>
      </CustomToolTip>
      <style jsx>{`
        .outline-none :global(path) {
          outline: none;
        }
      `}</style>
    </>
  );
});

const CustomGeography = ({ geo, currentSlug, callBack }) => {
  const { locale } = useRouter();

  // Styling
  const normalFill =
    currentSlug === getCountrySlug(geo, locale) ? currentFill : defaultFill;

  const hoverFill =
    currentSlug === getCountrySlug(geo, locale) ? currentFill : hoverGradient;

  const filter =
    currentSlug === getCountrySlug(geo, locale)
      ? "url(#inset-shadow-current)"
      : "url(#inset-shadow-default)";

  const style = {
    default: {
      fill: normalFill,
      stroke: colors["ko-blue"][100],
      strokeWidth: 2,
      transitionDuration: ".15s",
    },
    hover: {
      fill: hoverFill,
      filter: filter,
      strokeWidth: 4,
      stroke: colors.currentFill,
      transitionDuration: ".15s",
    },
  };

  return (
    <>
      <Link href={`/country/${getCountrySlug(geo, locale)}`} passHref>
        <CustomGeographyLink geo={geo}>
          <Geography geography={geo} style={style} onClick={callBack} />
        </CustomGeographyLink>
      </Link>
    </>
  );
};

export default CustomGeography;
