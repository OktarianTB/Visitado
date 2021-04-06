import React, { useRef, useEffect, useContext, useState } from "react";
import ReactDOM from "react-dom";
import styles from "./Map.module.css";
import mapboxgl from "mapbox-gl";
import * as MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import { Typography, Button } from "@material-ui/core";
import { useSnackbar } from "notistack";
import UserContext from "../../Utils/UserContext";
import Axios from "axios";

mapboxgl.accessToken =
  "pk.eyJ1Ijoib2t0YXJpYW4iLCJhIjoiY2ttcTBtcDRkMHY0cjJ4cnY4d3NpNmxlMiJ9.tILyfF19GGlat3f44pEZRw";

const MapContainer = ({ height, settings }) => {
  const { userData } = useContext(UserContext);
  const mapContainerRef = useRef(null);
  const popUpRef = useRef(new mapboxgl.Popup({ offset: 15 }));
  const { enqueueSnackbar } = useSnackbar();

  // initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/oktarian/ckmq0pu340nng17muwigrj2ty",
      center: settings.center,
      zoom: settings.zoom,
    });

    // add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), "bottom-right");

    const AddMarkers = ({
      imageUrl,
      data,
      imageName,
      sourceName,
      displayButton,
    }) => {
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
            "icon-anchor": "bottom",
          },
        });
      });

      map.on("click", sourceName, (e) => {
        if (e.features.length) {
          const feature = e.features[0];
          // create popup node
          const popupNode = document.createElement("div");
          ReactDOM.render(
            <Popup
              feature={feature}
              enqueueSnackbar={enqueueSnackbar}
              displayButton={displayButton}
              userData={userData}
            />,
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

    // add markers to the map
    map.on("load", function () {
      settings.markerLayers.forEach((layer) => {
        AddMarkers(layer);
      });

      if (settings.displaySearch) {
        AddMarkers({
          imageUrl: "http://maps.google.com/mapfiles/ms/micons/blue-dot.png",
          data: {
            type: "FeatureCollection",
            features: [],
          },
          imageName: "blueMarker",
          sourceName: "searchLayer",
          displayButton: true,
        });
      }
    });

    // add geocoder search bar
    if (settings.displaySearch) {
      const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        marker: false,
        zoom: 13,
      });

      geocoder.on("result", (info) => {
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
                coordinates: info.result.center,
              },
            },
          ],
        };

        popUpRef.current.remove();
        map.getSource("searchLayer").setData(marker);
      });

      map.addControl(geocoder);
    }

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

const Popup = ({ feature, enqueueSnackbar, displayButton, userData }) => {
  const { id, name, coordinates } = feature.properties;
  const [added, setAdded] = useState(false);

  const addLocation = async () => {
    setAdded(true);
    const url = "http://127.0.0.1:5000/user/location";
    const headers = {
      "x-auth-token": userData.token,
    };
    const newLocation = {
      name,
      location: { type: "Point", coordinates: JSON.parse(coordinates) },
    };

    await Axios.post(url, newLocation, { headers })
      .then(() => {
        enqueueSnackbar(`Added ${name} to your locations!`, {
          variant: "success",
          preventDuplicate: true,
          autoHideDuration: 2000,
        });
      })
      .catch(() => {
        enqueueSnackbar(`Unable to add ${name} to your locations.`, {
          variant: "info",
          preventDuplicate: true,
          autoHideDuration: 2000,
        });
      });
  };

  return (
    <div id={`popup-${id}`} className={styles.popup}>
      <Typography variant="body1" gutterBottom className={styles.popupText}>
        {name}
      </Typography>
      {displayButton ? (
        <Button
          color="primary"
          size="small"
          onClick={addLocation}
          disabled={added}
        >
          Add to Locations
        </Button>
      ) : (
        <React.Fragment></React.Fragment>
      )}
    </div>
  );
};

export default MapContainer;
