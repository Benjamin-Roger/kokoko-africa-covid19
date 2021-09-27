import React from "react";

const Signature = ({ side, rounded }) => (
  <div
    className={`signature absolute top-0 w-2 h-full overflow-hidden 
  ${side === "left" && rounded ? "rounded-l" : ""} 
  ${side === "right" && rounded ? "rounded-r" : ""}
  ${side === "right" ? "right-0" : ""}
  ${side === "left" ? "left-0" : ""}
  
  
  `}
  >
    <span className="block bg-ryg-red w-full h-1/3 "></span>
    <span className="block bg-ryg-yellow w-full h-1/3"></span>
    <span className="block bg-ryg-green w-full h-1/3"></span>
  </div>
);

export default Signature;
