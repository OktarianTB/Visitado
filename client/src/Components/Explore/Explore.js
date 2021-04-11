import React, { useState, useEffect, useContext } from "react";
import { Paper } from "@material-ui/core/";
import styles from "./Explore.module.css";
import MapContainer from "../Maps/Map";
import mapSettings from "../Maps/MapSettings";
import useWindowDimensions from "../../Utils/WindowSize";
import Axios from "axios";
import UserContext from "../../Utils/UserContext";

import Layout from "../Layout/Layout";

const Explore = () => {
  return <Layout Page={Page} />;
};

const Page = () => {
  const { height } = useWindowDimensions();
  const { userData } = useContext(UserContext);
  const [userLocations, setUserLocations] = useState([]);
  const [badgeLocations, setBadgeLocations] = useState([]);
  const [finishedBadges, setFinishedBadges] = useState(false);
  const [finishedUser, setFinishedUser] = useState(false);

  useEffect(() => {
    const getBadgeLocations = async () => {
      const url = `/api/badge/locations`;
      await Axios.get(url)
        .then((response) => {
          setBadgeLocations(response.data.data);
        })
        .catch(() => {});
      setFinishedBadges(true);
    };

    const getUserLocations = async () => {
      const url = `/api/user/location/${userData.user.username}`;
      await Axios.get(url)
        .then((response) => {
          setUserLocations(response.data.data);
        })
        .catch(() => {});
      setFinishedUser(true);
    };

    getBadgeLocations();
    getUserLocations();
  }, []);

  return (
    <Paper className={styles.paper}>
      {finishedBadges && finishedUser ? (
        <MapContainer
          height={0.75 * height}
          settings={mapSettings(
            [
              { color: "orange", locations: userLocations, button: false },
              { color: "blue", locations: badgeLocations, button: true },
            ],
            true,
            1,
            [0, 40]
          )}
        />
      ) : (
        <div></div>
      )}
    </Paper>
  );
};

export default Explore;
