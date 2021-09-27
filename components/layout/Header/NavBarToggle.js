import React from "react";

const NavBarToggle = (props) => {
  return (
    <>
      <div className="navbar-toggle ml-8 flex items-center">
        <button
          onClick={props.toggleMobileMenu}
          className="w-8 flex justify-center items-end flex-col"
          aria-label="Toggle menu"
        >
          <span className="block bg-ryg-red w-full h-1"></span>
          <span className="block bg-ryg-yellow w-full h-1 my-2"></span>
          <span
            className={`block bg-ryg-green h-1 ${
              props.open ? "w-full" : "w-2/3"
            } duration-150`}
          ></span>
        </button>
      </div>
      <style jsx>
        {`
          .navbar-toggle button {
            outline: none;
          }
        `}
      </style>
    </>
  );
};

export default NavBarToggle;
