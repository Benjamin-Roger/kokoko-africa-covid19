import EntranceIcon from "@/assets/svg/entrance.svg";
import SvgIcon from "@material-ui/core/SvgIcon";

import HomeWorkIcon from "@material-ui/icons/HomeWork";
import DirectionsBusIcon from "@material-ui/icons/DirectionsBus";
import FlightTakeoffIcon from "@material-ui/icons/FlightTakeoff";
import FlightLandIcon from "@material-ui/icons/FlightLand";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import AnnouncementIcon from "@material-ui/icons/Announcement";

// Import theme colors
import theme from "@/libs/theme.js";

const defaultProps = {
  className: "p-2",
  style: {
    width: "100%",
    height: "100%",
    color: theme.colors["ko-blue"][200],
  },
};

const IconSwitch = (props) => {
  const { type, color } = props;

  const styles = color
    ? {
        ...defaultProps,
        style: {
          ...defaultProps.style,
          color: color,
        },
      }
    : defaultProps;

  switch (type) {
    case "entrance":
      return (
        <SvgIcon {...styles} component={EntranceIcon} viewBox="0 0 39 39" />
      );
    case "innerTravel":
      return <DirectionsBusIcon {...styles} />;
    case "localLife":
      return <HomeWorkIcon {...styles} />;
    case "toDoBefore":
      return <FlightTakeoffIcon {...styles} />;
    case "toDoArrival":
      return <FlightLandIcon {...styles} />;
    case "stats":
      return <EqualizerIcon {...styles} />;
    case "news":
      return <AnnouncementIcon {...styles} />;
    default:
      return "";
  }
};

export default IconSwitch;
