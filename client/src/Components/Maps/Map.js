import React, { useRef, useEffect, useState } from "react";
import styles from "./Map.module.css";
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1Ijoib2t0YXJpYW4iLCJhIjoiY2ttcTBtcDRkMHY0cjJ4cnY4d3NpNmxlMiJ9.tILyfF19GGlat3f44pEZRw",
});

const MapContainer = () => {
  return (
    <Map
      style="mapbox://styles/oktarian/ckmq0pu340nng17muwigrj2ty"
      containerStyle={{
        height: "60vh",
        width: "100%",
      }}
      center={[114.109497, 22.396427]}
      zoom={[9]}
    ></Map>
  );
};

export default MapContainer;
