import React, { useState, useEffect } from "react";
import { Typography, Grid, Breadcrumbs } from "@material-ui/core/";
import { Link, useHistory } from "react-router-dom";
import styles from "./BadgeCategories.module.css";
import Layout from "../Layout/Layout";
import Attribution from "./Attribution";
import Badge from "./Badge";
import Axios from "axios";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

const BadgeCategories = () => {
  return <Layout Page={Page} />;
};

const Page = ({ match, location }) => {
  const {
    params: { badgeGroup },
  } = match;

  const history = useHistory();
  const [badgeList, setBadgeList] = useState([]);
  const [badgeGroupTitle, setBadgeGroupTitle] = useState("");

  useEffect(() => {
    const getBadgeList = async () => {
      const url = `/api/badge/category/${badgeGroup.toLowerCase()}`;
      await Axios.get(url)
        .then((response) => {
          setBadgeList(response.data.data);
          setBadgeGroupTitle(response.data.badgeGroup);
        })
        .catch(() => {
          history.push("/404/");
        });
    };

    getBadgeList();
  }, []);

  return (
    <div className={styles.main}>
      <History path={location.pathname} badgeGroupTitle={badgeGroupTitle} />
      <br />
      <Content badgeList={badgeList} path={location.pathname} />
      <br />
      <br />
      <br />
      <Attribution />
    </div>
  );
};

const History = ({ path, badgeGroupTitle }) => {
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
      <Link to={path} className={styles.breadcrumb}>
        <Typography variant="h4" component="h4">
          {badgeGroupTitle}
        </Typography>{" "}
      </Link>
    </Breadcrumbs>
  );
};

const Content = ({ badgeList, path }) => {
  const url = path.substring(path.length - 1) === "/" ? path : path + "/";

  return (
    <div className={styles.content}>
      <Grid container spacing={3}>
        {badgeList.map(({ title, thumbnail, slug }) => {
          console.log(slug);
          return (
            <Grid item xs={12} sm={4} key={title} style={{ marginBottom: 30 }}>
              <Badge
                title={title}
                image={`/${thumbnail}`}
                url={`${url}${slug}`}
                width={300}
              />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default BadgeCategories;
