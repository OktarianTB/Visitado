import React, { useState, useEffect, useContext } from "react";
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
import { Link, useHistory } from "react-router-dom";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import styles from "./BadgeContent.module.css";
import Layout from "../Layout/Layout";
import Attribution from "./Attribution";
import { useSnackbar } from "notistack";
import Axios from "axios";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import UserContext from "../../Utils/UserContext";

const BadgeContent = () => {
  return <Layout Page={Page} />;
};

const Page = ({ match, location }) => {
  const {
    params: { badgeGroup, badgeCategory },
  } = match;
  const { userData } = useContext(UserContext);
  const history = useHistory();
  const [badgeList, setBadgeList] = useState([]);
  const [badgeGroupTitle, setBadgeGroupTitle] = useState("");
  const [badgeCategoryTitle, setBadgeCategoryTitle] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [completed, setCompleted] = useState(0);

  useEffect(() => {
    const getBadgeList = async () => {
      const url = `http://127.0.0.1:5000/badge/items/${badgeGroup.toLowerCase()}/${badgeCategory.toLowerCase()}`;
      const headers = {
        "x-auth-token": userData.token,
      };
      await Axios.get(url, { headers })
        .then((response) => {
          setBadgeList(response.data.data);
          setBadgeGroupTitle(response.data.badgeGroup);
          setBadgeCategoryTitle(response.data.badgeCategory);
          setThumbnail(response.data.thumbnail);
        })
        .catch(() => {
          history.push("/404/");
        });
    };

    getBadgeList();
  }, []);

  useEffect(() => {
    let c = 0;
    badgeList.forEach((badge) => {
      if (badge.completed) c += 1;
    });
    setCompleted(c);
  }, [badgeList]);

  return (
    <div className={styles.main}>
      <History
        path={location.pathname}
        badgeGroupTitle={badgeGroupTitle}
        badgeCategoryTitle={badgeCategoryTitle}
      />
      <br />
      <Content
        badgeList={badgeList}
        badgeCategoryTitle={badgeCategoryTitle}
        thumbnail={`/${thumbnail}`}
        userData={userData}
        completed={completed}
        setBadgeList={setBadgeList}
        url={`http://127.0.0.1:5000/badge/items/${badgeGroup.toLowerCase()}/${badgeCategory.toLowerCase()}`}
      />
      <br />
      <br />
      <br />
      <Attribution />
    </div>
  );
};

const History = ({ path, badgeGroupTitle, badgeCategoryTitle, url }) => {
  const secondPath = path.split("/").slice(0, 3).join("/");

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
      <Link to={secondPath} className={styles.breadcrumb}>
        <Typography variant="h4" component="h4">
          {badgeGroupTitle}
        </Typography>
      </Link>
      <Link to={path} className={styles.breadcrumb}>
        <Typography variant="h4" component="h4">
          {badgeCategoryTitle}
        </Typography>
      </Link>
    </Breadcrumbs>
  );
};

const Content = ({
  badgeList,
  badgeCategoryTitle,
  thumbnail,
  userData,
  completed,
  setBadgeList,
  url,
}) => {
  return (
    <div className={styles.content}>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <Sidebar
            badgeCategoryTitle={badgeCategoryTitle}
            thumbnail={thumbnail}
            total={badgeList.length}
            completed={completed}
          />
        </Grid>
        <Grid item xs={8}>
          <Badges
            badgeList={badgeList}
            userData={userData}
            setBadgeList={setBadgeList}
            url={url}
          />
        </Grid>
      </Grid>
    </div>
  );
};

const Sidebar = ({ badgeCategoryTitle, thumbnail, total, completed }) => {
  return (
    <Paper className={styles.paper}>
      <img
        src={thumbnail}
        className={styles.badgeImage}
        alt={badgeCategoryTitle}
      />
      <Typography variant="h4" gutterBottom>
        {badgeCategoryTitle}
      </Typography>
      <br />
      {total > 0 ? (
        <Typography variant="h6" gutterBottom>
          {completed}/{total} Completed
        </Typography>
      ) : (
        <div></div>
      )}
      {total === completed ? (
        <CheckCircleIcon style={{ color: "#66bb6a" }} fontSize="large" />
      ) : (
        <div></div>
      )}
    </Paper>
  );
};

const Badges = ({ badgeList, userData, setBadgeList, url }) => {
  return (
    <div>
      {badgeList.map(
        ({ title, description, wikipedia_url, _id, completed }) => (
          <BadgeAccordion
            text={description}
            label={title}
            url={wikipedia_url}
            key={title}
            badgeId={_id}
            completed={completed}
            userData={userData}
            setBadgeList={setBadgeList}
            updateUrl={url}
          />
        )
      )}
    </div>
  );
};

const BadgeAccordion = ({
  label,
  text,
  url,
  badgeId,
  userData,
  completed,
  setBadgeList,
  updateUrl,
}) => {
  const { enqueueSnackbar } = useSnackbar();

  const updateBadgeList = async () => {
    const headers = {
      "x-auth-token": userData.token,
    };
    await Axios.get(updateUrl, { headers })
      .then((response) => {
        setBadgeList(response.data.data);
      })
      .catch(() => {});
  };

  const validateBadge = async (event) => {
    event.stopPropagation();

    if (event.target.checked) {
      const url = "http://127.0.0.1:5000/user/badge";
      const headers = {
        "x-auth-token": userData.token,
      };

      const badge = {
        badge: badgeId,
      };

      await Axios.post(url, badge, { headers })
        .then(() => {
          enqueueSnackbar(`New Badge Added: ${label}`, {
            variant: "success",
            preventDuplicate: true,
            autoHideDuration: 2000,
          });
        })
        .catch(() => {
          enqueueSnackbar(`Unable to Add: ${label}`, {
            variant: "default",
            preventDuplicate: true,
            autoHideDuration: 2000,
          });
        });
    } else {
      const url = `http://127.0.0.1:5000/user/badge/${badgeId}`;
      const headers = {
        "x-auth-token": userData.token,
      };

      await Axios.delete(url, { headers })
        .then(() => {
          enqueueSnackbar(`Removed Badge: ${label}`, {
            variant: "info",
            preventDuplicate: true,
            autoHideDuration: 2000,
          });
        })
        .catch((error) => {
          console.log(error);
          enqueueSnackbar(`Unable to Remove: ${label}`, {
            variant: "default",
            preventDuplicate: true,
            autoHideDuration: 2000,
          });
        });
    }

    updateBadgeList();
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
            checked={completed}
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
