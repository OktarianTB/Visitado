import React from "react";
import { Paper } from "@material-ui/core/";
import styles from "./Explore.module.css";
import MapContainer from "../Maps/Map";
import useWindowDimensions from "../../Utils/WindowSize";

import Layout from "../Layout/Layout";

const Explore = () => {
  return <Layout Page={Page} />;
};

const Page = () => {
  const { height } = useWindowDimensions();

  return (
    <Paper className={styles.paper}>
      <MapContainer height={0.75 * height} />
    </Paper>
  );
};

export default Explore;
