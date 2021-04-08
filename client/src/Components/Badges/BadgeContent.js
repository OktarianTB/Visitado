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