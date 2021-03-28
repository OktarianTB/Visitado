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
import styles from "./BadgesMain.module.css";
import { Link } from "react-router-dom";
import Layout from "../Layout/Layout";
import Attribution from "./Attribution";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

const Badges = () => {
  return <Layout Page={Page} />;
};

const Page = () => {
  return (
    <div className={styles.main}>
      <History />
      <br />
      <Content />
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

const Content = () => {
  return (
    <div className={styles.content}>
      <Grid container spacing={3}>
        {badgeList.slice(0, 3).map(({ title, number, image }) => {
          return (
            <Grid item xs={12} sm={4} key={title} style={{ marginBottom: 30 }}>
              <Badge title={title} number={number} image={image} />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

const Badge = ({ title, number, image }) => {
  return (
    <Link to="/badges/hongkong/" className={styles.link}>
      <Card style={{ maxWidth: 350 }}>
        <CardActionArea>
          <CardMedia
            className={styles.media}
            style={{ backgroundColor: "#eeeeee" }}
          >
            <img src={image} className={styles.badgeImage} alt={title} />
          </CardMedia>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2" align="center">
              {title}
            </Typography>

            <Typography
              variant="subtitle1"
              color="textSecondary"
              component="p"
              align="center"
            >
              {number} Badges Available
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
};

export default Badges;

const badgeList = [
  {
    title: "Hong Kong",
    number: 10,
    image: "ship.png",
  },
  {
    title: "China",
    number: 10,
    image: "dragon.png",
  },
  {
    title: "World",
    number: 10,
    image: "world.png",
  },
];
