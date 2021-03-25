import React from "react";
import { Typography, Link } from "@material-ui/core/";

const Attribution = () => {
  return (
    <Typography variant="caption" display="block" gutterBottom align="center">
      Icons made by{" "}
      <Link
        href="https://www.freepik.com"
        color="inherit"
        style={{ textDecoration: "underline" }}
      >
        Freepik
      </Link>{" "}
      and{" "}
      <Link
        href="https://www.flaticon.com/authors/smashicons"
        color="inherit"
        style={{ textDecoration: "underline" }}
      >
        Smashicons
      </Link>{" "}
      from{" "}
      <Link
        href="https://www.flaticon.com/"
        color="inherit"
        style={{ textDecoration: "underline" }}
      >
        Flaticon
      </Link>
      .
    </Typography>
  );
};

export default Attribution;
