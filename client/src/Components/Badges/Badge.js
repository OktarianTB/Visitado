import React from "react";
import {
  Typography,
  CardActionArea,
  Card,
  CardMedia,
  CardContent,
} from "@material-ui/core/";
import { Link } from "react-router-dom";
import styles from "./Badge.module.css";

import CheckCircleIcon from "@material-ui/icons/CheckCircle";

const Badge = ({ title, completed, total, image, width }) => {
  return (
    <Link to="/badges/hongkong/skyscrapers" className={styles.link}>
      <Card style={{ width }}>
        <CardActionArea>
          <CardMedia
            className={styles.media}
            style={{ backgroundColor: "#eeeeee" }}
          >
            <img src={image} className={styles.badgeImage} alt={title} />
          </CardMedia>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {title}
            </Typography>
            {completed === total ? (
              <CheckCircleIcon style={{ float: "right", color: "#66bb6a" }} />
            ) : (
              <div></div>
            )}

            <Typography variant="subtitle1" color="textSecondary" component="p">
              {completed}/{total} Completed
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
};

export default Badge;
