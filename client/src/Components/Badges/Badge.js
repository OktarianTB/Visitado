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

const Badge = ({ title, image, url, width }) => {
  return (
    <Link to={url} className={styles.link}>
      <Card style={{ maxWidth: width, borderBottom: "8px solid #ffcc80" }}>
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
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
};

export default Badge;
