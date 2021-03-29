import React, { useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./Map.module.css";
import mapboxgl from "mapbox-gl";
import * as MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import { Typography, Button } from "@material-ui/core";
import { useSnackbar } from "notistack";

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

const MapContainer = ({ height }) => {
  const mapContainerRef = useRef(null);
  const popUpRef = useRef(new mapboxgl.Popup({ offset: 15 }));
  const { enqueueSnackbar } = useSnackbar();

  // initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/oktarian/ckmq0pu340nng17muwigrj2ty",
      center: [114.1098795, 22.2976036],
      zoom: 9,
    });

    // add geocoder search bar
    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      marker: false,
      zoom: 13,
    });

    geocoder.on("result", (info) => {
      console.log(info.result);

      const marker = {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: info.result.center,
            },
            properties: {
              id: info.result.id,
              name: info.result.text,
              description: "IFC Tower",
            },
          },
        ],
      };

      popUpRef.current.remove();
      map.getSource("points3").setData(marker);
    });

    map.addControl(geocoder);

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

      map.on("click", sourceName, (e) => {
        if (e.features.length) {
          const feature = e.features[0];
          // create popup node
          const popupNode = document.createElement("div");
          ReactDOM.render(
            <Popup feature={feature} enqueueSnackbar={enqueueSnackbar} />,
            popupNode
          );
          // set popup on map
          popUpRef.current
            .setLngLat(feature.geometry.coordinates)
            .setDOMContent(popupNode)
            .addTo(map);
        }
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
      AddMarkers({
        imageUrl: "http://maps.google.com/mapfiles/ms/micons/green-dot.png",
        data: {},
        imageName: "marker3",
        sourceName: "points3",
      });
    });

    // clean up on unmount
    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      className={styles.mapContainer}
      ref={mapContainerRef}
      style={{ height, textAlign: "left" }}
    />
  );
};

const Popup = ({ feature, enqueueSnackbar }) => {
  const { id, name } = feature.properties;

  const addLocation = () => {
    enqueueSnackbar(`Added ${name} to your locations!`, {
      variant: "success",
      preventDuplicate: true,
      autoHideDuration: 2000,
    });
  };

  return (
    <div id={`popup-${id}`} className={styles.popup}>
      <Typography variant="body1" gutterBottom>
        {name}
      </Typography>
      <Button color="primary" size="small" onClick={addLocation}>
        Add to Locations
      </Button>
    </div>
  );
};

export default MapContainer;
