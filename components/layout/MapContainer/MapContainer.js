import React, { useState } from "react";
import { useRouter } from "next/router";

// Local components
import GeographyGradients from "./GeographyGradients";
import CustomGeography from "./CustomGeography";
import ZoomControls from "./ZoomControls";

// External libraries components
import { ComposableMap, Geographies, ZoomableGroup } from "react-simple-maps";

// Import theme colors
import theme from "@/libs/theme.js";
const { colors } = theme;

// Import country data
const geoArray = require("@/data/countries.json");

// Import libs
import { getSubregionFromSlug, getSubRegionCoordinates } from "@/libs/countries";

// Get mapCenter
const defaultMapCenter = [-20, 5, 0];

const MapContainer = (props) => {
  const { className, scale, callBack, variant } = props;

  // Get current slug and locale
  const { query, locale } = useRouter();
  const { slug } = query;

  // Align center on current geography
  const subregion = getSubregionFromSlug(slug, locale);
  const initialCoordinates = getSubRegionCoordinates(subregion);

  // Zoom management
  const [position, setPosition] = React.useState({
    coordinates: initialCoordinates,
    zoom: 1.5,
  });

  function handleZoomIn() {
    if (position.zoom >= 4) return;
    setPosition((pos) => ({ ...pos, zoom: (pos.zoom * 3) / 2 }));
  }

  function handleZoomOut() {
    console.log("zoon out ", position);
    if (position.zoom <= 1) return;
    setPosition((pos) => ({ ...pos, zoom: (pos.zoom * 2) / 3 }));
  }

  function handleMoveEnd(position) {
    setPosition(position);
  }

  // Map dimensions
  const [mapWidth, mapHeight] = [300, 600];

  return (
    <>
      <div
        className={`map-wrapper bg-map-gradient h-auto w-full relative ${
          className || ""
        }`}
        style={{
          touchAction: "none",
        }}
      >

        <ZoomControls
          zoomIn={handleZoomIn}
          zoomOut={handleZoomOut}
          variant={variant}
        />
        <ComposableMap
          projection="geoMercator"
          width={mapWidth}
          height={mapHeight}
          className="h-full w-full object-contain"
          projectionConfig={{
            scale: scale || 250,
            rotate: defaultMapCenter,
          }}
        >
          <ZoomableGroup
            zoom={position.zoom}
            center={position.coordinates}
            onMoveEnd={handleMoveEnd}
            translateExtent={[
              [-0.2 * mapWidth, -0.2 * mapHeight],
              [mapWidth * 1.2, mapHeight * 1.2],
            ]}
          >
            <GeographyGradients />

            <Geographies
              geography={geoArray}
              style={{
                default: {
                  fill: colors["ko-blue"][200],
                },
              }}
            >
              {({ geographies }) =>
                geographies.map((geo) => (
                  <CustomGeography
                    key={geo.properties.name}
                    currentSlug={slug}
                    geo={geo}
                    callBack={callBack}
                  />
                ))
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>

        <div className="overlay absolute top-0 left-0 w-full h-full"></div>
      </div>

      <style jsx>
        {`
          .map-wrapper {
            height: ${mapHeight}px;
          }

          .bg-map-gradient {
            background: ${variant == "dark"
              ? ""
              : `radial-gradient(${colors["ko-blue"][300]},transparent 50%)`};
          }

          .overlay {
            box-shadow: ${variant == "dark"
              ? ""
              : `inset 0em 0em 2em 2em ${colors["ko-blue"][900]}`};
          }

          .overlay {
            pointer-events: none;
          }
        `}
      </style>
    </>
  );
};

export default MapContainer;
