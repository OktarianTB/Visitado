import React from "react";
import {
  Typography,
  Breadcrumbs,
  Grid,
  Paper,
  Checkbox,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControlLabel,
  Link as UILink,
} from "@material-ui/core/";
import { Link } from "react-router-dom";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import styles from "./BadgeContent.module.css";
import Layout from "../Layout/Layout";
import Attribution from "./Attribution";
import { useSnackbar } from "notistack";

import CheckCircleIcon from "@material-ui/icons/CheckCircle";

const BadgeContent = () => {
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
      <Link to="/badges/hongkong/" className={styles.breadcrumb}>
        <Typography variant="h4" component="h4">
          Hong Kong
        </Typography>
      </Link>
      <Link to="/badges/hongkong/skyscrapers" className={styles.breadcrumb}>
        <Typography variant="h4" component="h4">
          Skyscrapers
        </Typography>
      </Link>
    </Breadcrumbs>
  );
};

const Content = () => {
  return (
    <div className={styles.content}>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <Sidebar />
        </Grid>
        <Grid item xs={8}>
          <Badges />
        </Grid>
      </Grid>
    </div>
  );
};

const Sidebar = () => {
  return (
    <Paper className={styles.paper}>
      <img
        src="/skyscrapers.png"
        className={styles.badgeImage}
        alt="skyscrapers"
      />
      <Typography variant="h4" gutterBottom>
        Skyscrapers
      </Typography>
      <Typography variant="body2" display="block">
        Hong Kong has over 9,000 high-rise buildings and one of the most iconic
        skylines in the world. How many have you checked out? Visit some of Hong
        Kong's tallest buildings to earn the badge!
      </Typography>
      <br />
      <Typography variant="h6" gutterBottom>
        7/7 Completed
      </Typography>
      <CheckCircleIcon style={{ color: "#66bb6a" }} fontSize="large" />
    </Paper>
  );
};

const Badges = () => {
  return (
    <div>
      {skyscrapers.map(({ label, url, text }) => (
        <BadgeAccordion text={text} label={label} url={url} key={label} />
      ))}
    </div>
  );
};

const BadgeAccordion = ({ label, text, url }) => {
  const { enqueueSnackbar } = useSnackbar();

  const validateBadge = (event) => {
    console.log(event.target.checked);
    event.stopPropagation();

    if (event.target.checked) {
      enqueueSnackbar(`New Badge Added: ${label}`, {
        variant: "success",
        preventDuplicate: true,
        autoHideDuration: 2000,
      });
    } else {
      enqueueSnackbar(`Badge Removed: ${label}`, {
        variant: "default",
        preventDuplicate: true,
        autoHideDuration: 2000,
      });
    }
  };

  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-label="Expand"
          aria-controls="additional-actions3-content"
          id="additional-actions3-header"
        >
          <FormControlLabel
            aria-label="Acknowledge"
            onClick={(event) => validateBadge(event)}
            onFocus={(event) => event.stopPropagation()}
            control={<Checkbox />}
            label={label}
          />
        </AccordionSummary>
        <AccordionDetails>
          <Typography color="textSecondary">
            {text} Read more{" "}
            <UILink
              href={url}
              color="inherit"
              style={{ textDecoration: "underline" }}
            >
              here
            </UILink>
            .
          </Typography>
        </AccordionDetails>
      </Accordion>
      <br />
    </div>
  );
};

export default BadgeContent;

const skyscrapers = [
  {
    label: "International Commerce Center",
    url: "https://en.wikipedia.org/wiki/International_Commerce_Centre",
    text:
      "The International Commerce Centre is a 108-storey, 484 m commercial skyscraper completed in 2010 in West Kowloon, Hong Kong. It is a part of the Union Square project on top of Kowloon station. It was the 4th tallest building in the world when its construction was completed in 2010.",
  },
  {
    label: "International Finance Centre",
    url:
      "https://en.wikipedia.org/wiki/International_Finance_Centre_(Hong_Kong)",
    text:
      "The International Finance Centre, abbreviated as IFC is a skyscraper and an integrated commercial development on the waterfront of Hong Kong's Central District. A prominent landmark on Hong Kong Island, IFC consists of two skyscrapers, the IFC Mall, and the 55-storey Four Seasons Hotel Hong Kong.",
  },
  {
    label: "Bank of China Tower",
    url: "https://en.wikipedia.org/wiki/Bank_of_China_Tower_(Hong_Kong)",
    text:
      "The Bank of China Tower is a skyscraper located in Central, Hong Kong. Located at 1 Garden Road on Hong Kong Island, the tower houses the headquarters of the Bank of China (Hong Kong) Limited.",
  },
  {
    label: "Central Plaza",
    url: "https://en.wikipedia.org/wiki/Central_Plaza_(Hong_Kong)",
    text:
      "Central Plaza is a 78-storey, 374 m skyscraper completed in August 1992 at 18 Harbour Road, in Wan Chai on Hong Kong Island in Hong Kong. It is the third tallest tower in the city after 2 International Finance Centre in Central and the ICC in West Kowloon.",
  },
  {
    label: "One Island East",
    url: "https://en.wikipedia.org/wiki/One_Island_East",
    text:
      "One Island East is a skyscraper in Taikoo Place, Quarry Bay, Hong Kong Island, Hong Kong.",
  },
  {
    label: "HSBC Building",
    url: "https://en.wikipedia.org/wiki/HSBC_Building_(Hong_Kong)",
    text:
      "HSBC Main Building is a headquarters building of The Hongkong and Shanghai Banking Corporation, which is today a wholly owned subsidiary of London-based HSBC Holdings. It is located on the southern side of Statue Square near the location of the old City Hall, Hong Kong.",
  },
  {
    label: "Hopewell Centre",
    url: "https://en.wikipedia.org/wiki/Hopewell_Centre_(Hong_Kong)",
    text:
      "Hopewell Centre is a 222-metre, 64-storey skyscraper at 183 Queen's Road East, in Wan Chai, Hong Kong Island in Hong Kong. The tower is the first circular skyscraper in Hong Kong. It is named after Hong Kong–listed property firm Hopewell Holdings Limited, which constructed the building.",
  },
];
