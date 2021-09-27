import React from "react";
import { useRouter } from "next/router";

// Import responsiveness
import theme from "@/libs/theme.js";

import Transition from "@/components/common/Transition";
import MapContainer from "@/components/layout/MapContainer/MapContainer";

const MapLayout = ({ children }) => {
  const { asPath } = useRouter();

  const mobileHeight = "55vh";
  const desktopHeight = "80vh";

  return (
    <>
      <div className="flex flex-col lg:flex-row-reverse">
        <div className="col flex-1 h-inherit relative lg:flex-4">
          <div className="map-wrapper z-0 fixed top-5 h-full w-full lg:sticky lg:top-2 flex items-center">
            <MapContainer scale={350} />
          </div>
        </div>

        <div
          id="content"
          className="col flex-1 h-full p-4 bg-ko-blue-300 z-10 shadow-2xl rounded-t-lg lg:shadow-none lg:bg-transparent lg:flex-6"
        >
          <hr className="mx-auto border-ko-blue-100 w-1/2 rounded mt-2 mb-4 border-2 lg:hidden" />
          <Transition location={asPath}>
            <div>{children}</div>
          </Transition>
        </div>
      </div>

      <style>
        {`.flex .col {
            min-height:${mobileHeight};
          }
          
          .map-wrapper {
            max-height:calc(${mobileHeight} + 70px);
          }

          @media (min-width:${theme.screens.lg}) {
            .flex .col {
              min-height:${desktopHeight};
            }
            
            .map-wrapper {
              max-height:${desktopHeight};
            }
          }
          
          `}
      </style>
    </>
  );
};

export default MapLayout;
