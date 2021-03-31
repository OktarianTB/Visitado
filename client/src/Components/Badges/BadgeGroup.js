import React, { useState, useEffect } from "react";
import {
  Typography,
  Breadcrumbs,
  Grid,
  CardActionArea,
  Card,
  CardMedia,
  CardContent,
} from "@material-ui/core/";
import styles from "./BadgeGroup.module.css";
import { Link, useHistory } from "react-router-dom";
import Layout from "../Layout/Layout";
import Attribution from "./Attribution";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import Axios from "axios";

const BadgeGroup = () => {
  return <Layout Page={Page} />;
};

const Page = () => {
  const history = useHistory();
  const [badgeList, setBadgeList] = useState([]);

  useEffect(() => {
    const getBadgeList = async () => {
      const url = `http://127.0.0.1:5000/badge/group`;
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
              <Badge title={title} image={thumbnail} slug={slug} />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

const Badge = ({ title, image, slug }) => {
  const url = `/badges/${slug}/`;

  return (
    <Link to={url} className={styles.link}>
      <Card style={{ maxWidth: 350 }}>
        <CardActionArea>
          <CardMedia
            className={styles.media}
            style={{ backgroundColor: "#eeeeee" }}
          >
            <img src={`/${image}`} className={styles.badgeImage} alt={title} />
          </CardMedia>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2" align="center">
              {title}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
};

/*
<Typography
              variant="subtitle1"
              color="textSecondary"
              component="p"
              align="center"
            >
              {number} Badges Available
            </Typography>
*/

export default BadgeGroup;
