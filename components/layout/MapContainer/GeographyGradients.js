// Import theme colors
import theme from "@/libs/theme.js";
const { colors } = theme;

const GeographyGradients = () => (
  <>
    <defs>
      <radialGradient id="defaultGradient">
        <stop offset="0%" stopColor={colors["ko-blue"][300]} />
        <stop offset="100%" stopColor={colors["ko-blue"][200]} />
      </radialGradient>
    </defs>

    <filter id="inset-shadow-default" x="-50%" y="-50%" width="400%" height="400%">
      <feComponentTransfer in="SourceAlpha">
        <feFuncA type="table" tableValues="1 0" />
      </feComponentTransfer>
      <feGaussianBlur stdDeviation="4" />
      <feOffset dx="0" dy="0" result="offsetblur" />
      <feFlood floodColor={colors.severity.low} result="color" />
      <feComposite in2="offsetblur" operator="in" />
      <feComposite in2="SourceAlpha" operator="in" />
      <feMerge>
        <feMergeNode in="SourceGraphic" />
        <feMergeNode />
      </feMerge>
    </filter>

    <filter id="inset-shadow-current" x="-50%" y="-50%" width="400%" height="400%">
      <feComponentTransfer in="SourceAlpha">
        <feFuncA type="table" tableValues="1 0" />
      </feComponentTransfer>
      <feGaussianBlur stdDeviation="4" />
      <feOffset dx="0" dy="0" result="offsetblur" />
      <feFlood floodColor={colors["ko-blue"][200]} result="color" />
      <feComposite in2="offsetblur" operator="in" />
      <feComposite in2="SourceAlpha" operator="in" />
      <feMerge>
        <feMergeNode in="SourceGraphic" />
        <feMergeNode />
      </feMerge>
    </filter>
  </>
);

export default GeographyGradients;
