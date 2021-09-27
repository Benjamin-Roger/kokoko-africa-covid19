import React from "react";

import Link from "next/link";
import config from "@/config";

import Logo from "./Logo";

import Fade from "@material-ui/core/Fade";

// Import theme colors
import theme from "@/libs/theme.js";
const { colors } = theme;

import {withTranslation} from '@/libs/i18n';
import MaterialIconButton from "../../home/MaterialIconButton";

import TranslateMenu from "./TranslateMenu";



const NavBarMobile = ({open,current,toggleMobileMenu,t}) => (
  <>
    <Fade  in={open}>
      <div className={`h-screen w-screen fixed top-0 left-0 z-30 flex flex-col bg-ko-blue-900 bg-opacity-90 text-center justify-center items-center lg:hidden ${!open ? "pointer-events-none" : ''}`}>
        <Logo className="w-1/2 h-24" />
        <nav className="w-full flex flex-col text-center justify-center my-5">
          {config.navLinks.map((link) => (
            <Link href={link.href} key={`nav-mobile-${link.name}`}>
              <a
                className={`py-5 text-2xl w-100 hover:bg-ko-blue-300 bg-opacity-90 duration-150 ${
                  current === link.href ? "active" : ""
                }`}
                onClick={toggleMobileMenu}
              >
                {t(link.name)}
              </a>
            </Link>
          ))}
        </nav>
        <TranslateMenu />
      </div>
    </Fade>
    <style jsx>
      {`
        a.active {
          color: ${colors["ko-blue"][900]};
          background: #fff;
        }
      `}
    </style>
  </>
);

export default withTranslation('nav')(NavBarMobile);
