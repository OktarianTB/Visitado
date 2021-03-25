import React from "react";
import { Typography, Grid, Breadcrumbs } from "@material-ui/core/";
import { Link } from "react-router-dom";
import styles from "./BadgesLocation.module.css";
import Layout from "../Layout/Layout";
import Attribution from "./Attribution";
import Badge from "./Badge";

import NavigateNextIcon from "@material-ui/icons/NavigateNext";

const BadgesLocation = () => {
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
      <Link to="/badges/hongkong" className={styles.breadcrumb}>
        <Typography variant="h4" component="h4">
          Hong Kong
        </Typography>{" "}
      </Link>
    </Breadcrumbs>
  );
};

const Content = () => {
  return (
    <div className={styles.content}>
      <Grid container spacing={3}>
        {badgeList.slice(0, 3).map(({ title, completed, total, image }) => {
          return (
            <Grid item xs={12} sm={4} key={title} style={{ marginBottom: 30 }}>
              <Badge
                title={title}
                completed={completed}
                total={total}
                image={image}
                width={300}
              />
            </Grid>
          );
        })}
        {badgeList.slice(3, 6).map(({ title, completed, total, image }) => {
          return (
            <Grid item xs={12} sm={4} key={title}>
              <Badge
                title={title}
                completed={completed}
                total={total}
                image={image}
                width={300}
              />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default BadgesLocation;

const badgeList = [
  {
    title: "Hikes",
    completed: "0",
    total: "22",
    image: "/hiking.png",
    backgroundColor: "red",
  },
  {
    title: "Skyscrapers",
    completed: "5",
    total: "5",
    image: "/skyscrapers.png",
    backgroundColor: "red",
  },
  {
    title: "Monuments",
    completed: "3",
    total: "3",
    image: "/ship.png",
    backgroundColor: "red",
  },
  {
    title: "Food",
    completed: "1",
    total: "3",
    image: "/noodles.png",
    backgroundColor: "red",
  },
  {
    title: "Transport",
    completed: "0",
    total: "13",
    image: "/train.png",
    backgroundColor: "red",
  },
  {
    title: "Activities",
    completed: "10",
    total: "12",
    image: "/laugh.png",
    backgroundColor: "red",
  },
];
