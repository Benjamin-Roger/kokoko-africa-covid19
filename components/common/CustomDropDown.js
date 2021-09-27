import React, { useState } from "react";
import MaterialIconButton from "@/components/home/MaterialIconButton";

import moment from "moment-mini";

import Slide from "@material-ui/core/Slide";

const CustomDropDown = (props) => {
  const { title, date, children } = props;

  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="dropdown w-full bg-ko-blue-300 rounded my-3">
        <div
          className="dropdown__header flex items-center justify-between border-b border-ko-blue-900 cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          <div className="dropdown__header__text flex items-center py-2 ">
            <p className="mr-4 mb-0 font-bold">{moment(date).format("DD\/MM\/YYYY")}</p>
            <p className="mb-0">{title}</p>
          </div>

          <div
            className={`dropdown__chevron transform duration-150 ${
              open ? " rotate-180" : ""
            }`}
          >
            <MaterialIconButton
              icon="keyboard_arrow_down"
              color="white"
              onClick={() => setOpen(!open)}
            />
          </div>
        </div>
        <div className={`dropdown__body duration-150 overflow-hidden `}>
          <Slide in={open}>
            <div className="my-4">{children}</div>
          </Slide>
        </div>
      </div>
      <style jsx>
        {`
          .dropdown__body {
            max-height: ${open ? "2000px" : 0};
            height: 100%;
          }
        `}
      </style>
    </>
  );
};

export default CustomDropDown;
