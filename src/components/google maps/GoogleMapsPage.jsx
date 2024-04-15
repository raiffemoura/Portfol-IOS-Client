import React from "react";
import HomeButtonMaps from "./HomeButtonMaps.jsx";
import GoogleMapsMap from "./GoogleMapsMap.tsx";

const GoogleMapsPage = () => {
  return (
    <div className="maps-screen">
      <GoogleMapsMap />
      <HomeButtonMaps />
    </div>
  );
};

export default GoogleMapsPage;
