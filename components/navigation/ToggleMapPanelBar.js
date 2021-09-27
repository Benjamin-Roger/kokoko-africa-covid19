import { useState } from "react";

import PublicIcon from "@material-ui/icons/Public";
import Slide from "@material-ui/core/Slide";

import MapContainer from "@/components/layout/MapContainer/MapContainer";

const MapBarButton = (props) => (
  <>
    <div className={`fixed bottom-0 left-0 w-full bg-gradient-to-r from-ko-blue-300 to-ko-blue-200 z-20 lg:hidden ${props.open ? 'z-60' : ''}`}>
      <button
        {...props}
        className="container w-full px-2 flex items-center justify-center h-20 "
      >
        {!props.open ? (
          <>
            <PublicIcon style={{ color: "#fff" }} />
            <p className="ml-3">Use the map</p>
          </>
        ) : (
          <p>Close the map</p>
        )}
      </button>
    </div>
  </>
);

const MapBarPanel = ({ open, closePanel }) => (
  <>
    <Slide in={open} direction="down">
      <div className="bg-ko-blue-900 h-screen w-screen overflow-hidden fixed top-0 left-0 z-50 lg:hidden">
        <p className="px-4 mt-4 text-lg text-center font-bold">
          Select a country to get information
        </p>
        <MapContainer callBack={closePanel} scale={200}/>
      </div>
    </Slide>
  </>
);

const ToggleMapPanelBar = () => {
  const [sidePanel, toggleSidePanel] = useState(false);

  return (
    <>
      <MapBarButton
        onClick={() => toggleSidePanel(!sidePanel)}
        open={sidePanel}
      />

      <MapBarPanel open={sidePanel} closePanel={() => toggleSidePanel(false)} />
    </>
  );
};

export default ToggleMapPanelBar;
