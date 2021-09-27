import { useRouter } from "next/router";
import React from "react";

import NavBar from "./NavBar";
import NavBarToggle from "./NavBarToggle";
import NavBarMobile from "./NavBarMobile";
import Logo from './Logo'

import Signature from '@/components/common/Signature'


const Header = () => {
  // Get active path
  const { pathname } = useRouter();

  // Manage mobile menu sidepanel
  const [open, setOpen] = React.useState(false);
  const toggleMobileMenu = () => {
    setOpen(!open);
  };

  return (
    <>
      <header className="">
        <div className="hidden lg:flex container bg-ko-blue-300 my-5 rounded-xl relative px-10 flex justify-between">
          <Signature side="right" rounded={true} />
          <Logo />
          <NavBar current={pathname} />
        </div>
        <div className="lg:hidden fixed top-0 right-0 m-8 z-40">
          <NavBarToggle open={open} toggleMobileMenu={toggleMobileMenu} />
        </div>
        <NavBarMobile
          current={pathname}
          open={open}
          toggleMobileMenu={toggleMobileMenu}
        />
      </header>

      <style jsx>
        {`
        header {
          min-height:70px;
        }
        `}
      </style>
    </>
  );
};

export default Header;
