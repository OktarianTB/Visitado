import React, { useState, useEffect } from "react";
import {
  Typography,
  Breadcrumbs,
  Grid,
} from "@material-ui/core/";
import styles from "./BadgeGroup.module.css";
import { Link, useHistory } from "react-router-dom";
import Layout from "../Layout/Layout";
import Attribution from "./Attribution";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import Axios from "axios";
import Badge from "./Badge";

const BadgeGroup = () => {
  return <Layout Page={Page} />;
};

const Page = () => {
  const history = useHistory();
  const [badgeList, setBadgeList] = useState([]);

  useEffect(() => {
    const getBadgeList = async () => {
      const url = `/api/badge/group`;
      await Axios.get(url)
        .then((response) => {
          setBadgeList(response.data.data);
        })
        .catch(() => {
          history.push("/404/");
        });
    };

    getBadgeList();
  }, []);

  return (
    <div className={styles.main}>
      <History />
      <br />
      <Content badgeList={badgeList} />
      <br />
      <br />
      <br />
      <Attribution />
    </div>
  );
};

const History = () => {
  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
    >
      <Link to="/badges" className={styles.breadcrumb}>
        <Typography variant="h4" component="h4">
          Badges
        </Typography>
      </Link>
    </Breadcrumbs>
  );
};

const Content = ({ badgeList }) => {
  return (
    <div className={styles.content}>
      <Grid container spacing={3}>
        {badgeList.map(({ title, thumbnail, slug }) => {
          return (
            <Grid item xs={12} sm={4} key={title} style={{ marginBottom: 30 }}>
              <Badge
                title={title}
                image={`/${thumbnail}`}
                url={`/badges/${slug}/`}
                width={350}
              />
             
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default BadgeGroup;
