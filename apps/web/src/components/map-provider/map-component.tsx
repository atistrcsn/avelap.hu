"use client";

import { MapProvider } from "@/components/map-provider/map-provider";
import { GoogleMap, MarkerF } from "@react-google-maps/api";
import React, { FC } from "react";
import pinicon from "./pin.svg"
export const defaultMapContainerStyle = {
  width: "100%",
  height: "80vh",
  borderRadius: "15px 0px 0px 15px",
};

type MapProps = {
  lat: number;
  long: number;
};

const GoogleMapClient: FC<MapProps> = ({ lat, long }) => {
  const defaultMapCenter = {
    lat: lat,
    lng: long,
  };
  const MARKER_POSITION: google.maps.LatLngLiteral = defaultMapCenter;
  const defaultMapZoom = 18;
  const defaultMapOptions = {
    zoomControl: true,
    tilt: 0,
    gestureHandling: "auto",
    mapTypeId: "roadmap",
    streetViewControl: false
  };
  
  return (
    <MapProvider>
      <GoogleMap
        mapContainerStyle={defaultMapContainerStyle}
        center={defaultMapCenter}
        options={defaultMapOptions}
        zoom={defaultMapZoom}
      >
        <MarkerF position={MARKER_POSITION} icon={pinicon} />
      </GoogleMap>
    </MapProvider>
  );
};

export default GoogleMapClient;
