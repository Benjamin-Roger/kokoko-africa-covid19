import React from "react";

import Tooltip from "@material-ui/core/Tooltip";
import { makeStyles } from "@material-ui/core/styles";

// Import theme colors
import theme from "@/libs/theme.js";
const { colors } = theme;

const useStylesToolTip = makeStyles((theme) => ({
  arrow: {
    color: "white",
  },
  tooltip: {
    background:`linear-gradient(to right, ${colors["ko-blue"][900]},${colors["ko-blue"][300]})`,
    padding:'10px 15px',
    fontSize:'80%'
  },
}));

function CustomToolTip(props) {
  const classes = useStylesToolTip();

  return (
    <Tooltip arrow classes={classes} {...props} />
  );
};

export default CustomToolTip;
