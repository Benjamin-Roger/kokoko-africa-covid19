import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

// Import theme colors
import theme from "@/libs/theme.js";
const { colors } = theme;

const CircularStat = ({ text, percentage }) => (
  <CircularProgressbar
    text={text}
    value={percentage * 100}
    styles={buildStyles({
      // Rotation of path and trail, in number of turns (0-1)
      rotation: 0,

      // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
      strokeLinecap: "butt",

      // How long animation takes to go from one percentage to another, in seconds
      pathTransitionDuration: 0.5,

      // Can specify path transition in more detail, or remove it entirely
      // pathTransition: 'none',

      // Colors
      pathColor: `rgba(62, 152, 199, ${percentage * 100})`,
      textColor:"white",
      trailColor: colors["ko-blue"][200],
      backgroundColor: "#eee",
    })}
  />
);

export default CircularStat;