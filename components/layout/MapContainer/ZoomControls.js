import MaterialIconButton from "@/components/home/MaterialIconButton";

import theme from "@/libs/theme";

const ZoomControls = (props) => (
  <>
    <div className="flex flex-col z-20 m-4 absolute top-0 left-0 md:bottom-0 md:right-0 md:top-auto md:left-auto">
      <MaterialIconButton
        icon="add"
        color={props.variant === "dark" ? theme.colors["ko-blue"][900] : "white"}
        onClick={props.zoomIn}
        aria-label="Zoom in"
      />

      <MaterialIconButton
        icon="remove"
        color={props.variant === "dark" ? theme.colors["ko-blue"][900] : "white"}
        onClick={props.zoomOut}
        aria-label="Zoom out"
      />
    </div>
  </>
);

export default ZoomControls;
