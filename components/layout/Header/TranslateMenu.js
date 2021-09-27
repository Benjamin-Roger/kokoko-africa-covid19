import { useRouter } from "next/router";
import React from "react";

import TranslateIcon from "@material-ui/icons/Translate";

import { withTranslation } from "@/libs/i18n";

import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Fade from "@material-ui/core/Fade";
import { getCurrentGeometry } from "@/libs/geometries";
import { getCountrySlug } from "@/libs/countries";


function TranslateMenu({ t }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const router = useRouter();

  const { locale, locales, pathname, query } = router;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeLocale = (l) => {
    handleClose();

    // Default case for pages without translated paths
    let path = pathname;

    // Case for country
    if (path.includes("country/[slug]")) {
      const { slug } = router.query;
      const currentGeometry = getCurrentGeometry(slug, locale);
      const translatedCountrySlug = getCountrySlug(currentGeometry, l);
      
      path = pathname.replace("[slug]",translatedCountrySlug);
    }

    console.log(path);


    router.push(path, path, { locale: l });

  };

  return (
    <>
      <IconButton
        style={{ color: "white" }}
        aria-label="Translate page"
        component="span"
        onClick={handleClick}
      >
        <TranslateIcon />
      </IconButton>
      <Menu
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        id="translate-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        {locales
          .filter((l) => l !== locale)
          .map((l) => (
            <MenuItem key={l} onClick={() => changeLocale(l)}>{t(l)}</MenuItem>
          ))}
      </Menu>
    </>
  );
}

export default withTranslation("locales")(TranslateMenu);
