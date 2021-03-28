import React, { useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./Map.module.css";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1Ijoib2t0YXJpYW4iLCJhIjoiY2ttcTBtcDRkMHY0cjJ4cnY4d3NpNmxlMiJ9.tILyfF19GGlat3f44pEZRw";

const universities = {
  type: "FeatureCollection",
  features: [
    {
      // feature for Mapbox SF
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [114.2619042, 22.3387645],
      },
      properties: {
        id: "abcd",
        name: "HKUST",
        description: "University",
      },
    },
    {
      // feature for Mapbox SF
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [114.1989273, 22.420666],
      },
      properties: {
        id: "abcd",
        name: "CUHK",
        description: "University",
      },
    },
  ],
};

const skyscrapers = {
  type: "FeatureCollection",
  features: [
    {
      // feature for Mapbox SF
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [114.1562822, 22.2863981],
      },
      properties: {
        id: "abcd",
        name: "IFC",
        description: "IFC Tower",
      },
    },
    {
      // feature for Mapbox SF
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [114.1598327, 22.3035197],
      },
      properties: {
        id: "abcd",
        name: "ICC",
        description: "ICC Tower",
      },
    },
  ],
};

const MapContainer = () => {
  const mapContainerRef = useRef(null);
  const popUpRef = useRef(new mapboxgl.Popup({ offset: 15 }));

  // initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/oktarian/ckmq0pu340nng17muwigrj2ty",
      center: [114.1098795, 22.2976036],
      zoom: 9,
    });

    // add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), "bottom-right");

    const AddMarkers = ({ imageUrl, data, imageName, sourceName }) => {
      map.loadImage(imageUrl, function (error, image) {
        if (error) throw error;
        map.addImage(imageName, image);
        map.addSource(sourceName, {
          type: "geojson",
          data,
        });
        map.addLayer({
          id: sourceName,
          type: "symbol",
          source: sourceName,
          layout: {
            "icon-image": imageName,
            "icon-size": 0.7,
          },
        });
      });
    };

    map.on("load", function () {
      AddMarkers({
        imageUrl: "http://maps.google.com/mapfiles/ms/micons/orange-dot.png",
        data: universities,
        imageName: "marker1",
        sourceName: "points1",
      });
      AddMarkers({
        imageUrl: "http://maps.google.com/mapfiles/ms/micons/blue-dot.png",
        data: skyscrapers,
        imageName: "marker2",
        sourceName: "points2",
      });
    });

    map.on("click", "points1", (e) => {
      if (e.features.length) {
        const feature = e.features[0];
        // create popup node
        const popupNode = document.createElement("div");
        ReactDOM.render(<Popup feature={feature} />, popupNode);
        // set popup on map
        popUpRef.current
          .setLngLat(feature.geometry.coordinates)
          .setDOMContent(popupNode)
          .addTo(map);
      }
    });

    // clean up on unmount
    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <div className={styles.mapContainer} ref={mapContainerRef} />;
};

const Popup = ({ feature }) => {
  const { id, name, description } = feature.properties;

  return (
    <div id={`popup-${id}`}>
      <h3>{name}</h3>
      {description}
    </div>
  );
};

export default MapContainer;
