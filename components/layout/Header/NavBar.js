import Link from "next/link";
import { useRouter } from "next/router";

import config from "@/config";

// Import theme colors
import theme from "@/libs/theme.js";
const { colors } = theme;

import React from "react";

import TranslateMenu from "./TranslateMenu";

import { withTranslation } from "@/libs/i18n";

const NavBarComponent = ({ current, t }) => (
  <>
    <div className="hidden md:flex">
      <nav className="flex ">
        {config.navLinks.map((link) => (
          <Link href={link.href} key={`nav-${link.name}`}>
            <a
              className={`mx-4 py-5 px-3 relative ${
                current === link.href ? "active" : ""
              }`}
            >
              {t(link.name)}
            </a>
          </Link>
        ))}
      </nav>
      <TranslateMenu />
    </div>
    <style jsx>
      {`
        a::after {
          content: "";
          width: 0%;
          height: 2px;
          position: absolute;
          bottom: 0;
          left: 0;
          background: ${colors["ko-blue"][100]};
          transition: width 0.15s ease-in-out;
        }
        a.active::after,
        a:hover::after {
          width: 100%;
        }

        a.active::after {
          background: white !important;
        }
      `}
    </style>
  </>
);

const NavBar = withTranslation("nav")(NavBarComponent);

export default NavBar;
