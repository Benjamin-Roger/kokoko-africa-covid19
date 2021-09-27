const name = "Kokoko";
const website = "https://covid19.kokoko.africa";
const defaultSiteDescription =
  "Find updated information on Covid-19 travel restrictions in African countries";
const siteTitle = "Kokoko | Covid-19 travel restrictions in Africa";
const getFormAction = "https://getform.io/f/031114a2-b0bc-400c-8928-20296e82d460";

const logo = { src: "/images/logo_share.png", width: 200, height: 203 };

const navLinks = [
  {
    name: "home",
    href: "/",
  },
  {
    name: "about",
    href: "/about",
  },
  {
    name: "searchByCountry",
    href: "/country",
  },
  {
    name: "contact",
    href: "/contact",
  },
];

module.exports = {
  navLinks,

  name,
  website,
  defaultSiteDescription,
  siteTitle,
  logo,
  getFormAction
};
