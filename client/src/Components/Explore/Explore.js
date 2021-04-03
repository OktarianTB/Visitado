import React, { useState } from "react";
import { Paper } from "@material-ui/core/";
import styles from "./Explore.module.css";
import MapContainer from "../Maps/Map";
import mapSettings from "../Maps/MapSettings";
import useWindowDimensions from "../../Utils/WindowSize";

import Layout from "../Layout/Layout";

const Explore = () => {
  return <Layout Page={Page} />;
};

const Page = () => {
  const { height } = useWindowDimensions();
  const [locations, setLocations] = useState([]);
  const [finished, setFinished] = useState(true);

  return (
    <Paper className={styles.paper}>
      {finished ? (
        <MapContainer
          height={0.75 * height}
          settings={mapSettings(locations, true, true)}
        />
      ) : (
        <div></div>
      )}
    </Paper>
  );
};

export default Explore;
