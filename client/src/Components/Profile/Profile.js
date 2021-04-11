import React, { useEffect, useState } from "react";
import { Grid, Typography, Paper, Divider } from "@material-ui/core/";
import styles from "./Profile.module.css";
import Layout from "../Layout/Layout";
import MapContainer from "../Maps/Map";
import mapSettings from "../Maps/MapSettings";
import BadgePost from "../Posts/BadgePost";
import BadgeCategoryPost from "../Posts/BadgeCategoryPost";
import ActivityPost from "../Posts/ActivityPost";
import Axios from "axios";
import { useHistory } from "react-router-dom";

const Profile = () => {
  return <Layout Page={Page} />;
};

const Page = ({ match }) => {
  const {
    params: { username },
  } = match;
  const history = useHistory();
  const [user, setUser] = useState(null);
  const [locations, setLocations] = useState([]);
  const [badges, setBadges] = useState([]);
  const [finishedLocations, setFinishedLocations] = useState(false);
  const [finishedBadges, setFinishedBadges] = useState(false);
  const [posts, setPosts] = useState([]);
  const [badgePosts, setBadgePosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    const getUser = async () => {
      const url = `http://127.0.0.1:5000/user/${username}`;
      await Axios.get(url)
        .then((response) => {
          setUser(response.data.data);
        })
        .catch(() => {
          history.push("/404/");
        });
    };

    const getLocations = async () => {
      const url = `http://127.0.0.1:5000/user/location/${username}`;
      await Axios.get(url)
        .then((response) => {
          setLocations(response.data.data);
        })
        .catch(() => {});
      setFinishedLocations(true);
    };

    const getBadges = async () => {
      const url = `http://127.0.0.1:5000/user/badge/${username}`;
      await Axios.get(url)
        .then((response) => {
          setBadges(response.data.data);
        })
        .catch(() => {});
      setFinishedBadges(true);
    };

    const getPosts = async () => {
      const url = `http://127.0.0.1:5000/post/recent/${username}`;
      await Axios.get(url)
        .then((response) => {
          const allPosts = response.data.data.map((post) => {
            const newpost = { type: "post", ...post };
            return newpost;
          });
          setPosts(allPosts);
        })
        .catch(() => {});
    };

    const getBadgePosts = async () => {
      const url = `http://127.0.0.1:5000/post/badges/${username}`;
      await Axios.get(url)
        .then((response) => {
          const allBadgePosts = response.data.data.map((post) => {
            const newpost = { type: "badge", ...post };
            return newpost;
          });
          setBadgePosts(allBadgePosts);
        })
        .catch(() => {});
    };

    getUser();
    getLocations();
    getBadges();
    getPosts();
    getBadgePosts();
  }, []);

  useEffect(() => {
    let combined = posts.concat(badgePosts);

    combined = combined.sort(function (a, b) {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    setAllPosts(combined);
  }, [posts, badgePosts]);

  return user ? (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <Sidebar user={user} badges={badges} />
        </Grid>
        <Grid item xs={8}>
          {finishedLocations && finishedBadges ? (
            <Content
              settings={mapSettings(
                [{ color: "orange", locations, button: false }],
                false
              )}
              user={user}
              posts={allPosts}
            />
          ) : (
            <div></div>
          )}
        </Grid>
      </Grid>
    </div>
  ) : (
    <div></div>
  );
};

const Sidebar = ({ user, badges }) => {
  return (
    <Paper className={styles.paper}>
      <img
        src={`/${user.picture_url}`}
        className={styles.avatar}
        alt="profile"
      />
      <Typography variant="h4" gutterBottom>
        {user.displayName}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        @{user.username} ● 📍 {user.location}
      </Typography>
      <br />
      <Typography variant="body2" display="block">
        {user.biography}
      </Typography>
      <br />
      <Divider key="sidebar-div" />
      <br />
      <Typography variant="h6" gutterBottom>
        Badges
      </Typography>
      <br />
      <Grid container spacing={3}>
        {badges.map((badge, i) => {
          const img = `/${badge.thumbnail}`;
          return (
            <Grid item xs={6} key={i}>
              <img
                src={img}
                className={styles.badgeImage}
                alt={badge.slug}
                key={badge.slug}
              />
            </Grid>
          );
        })}
      </Grid>
      {badges.length === 0 ? (
        <div>
          <br />
          <Typography variant="subtitle1" align="center">
            No badges collected yet!
          </Typography>
          <br />
        </div>
      ) : (
        <div></div>
      )}
    </Paper>
  );
};

const Content = ({ settings, user, posts }) => {
  return (
    <div className={styles.contentDiv}>
      <Paper className={styles.paper}>
        <MapContainer height={"60Vh"} settings={settings} />
      </Paper>
      {posts.map((post) => {
        if (post.type === "post") {
          return (
            <ActivityPost
              key={post.title}
              profile_picture={post.user.picture_url}
              username={post.user.username}
              date={post.createdAt}
              title={post.title}
              content={post.content}
              activity={post.activity}
              location={post.location ? post.location.name : null}
              badge={post.badge ? post.badge.title : null}
              images={post.images}
            />
          );
        } else if (post.type === "badge") {
          return (
            <BadgePost
              key={post.badge.title}
              image={post.badge.badge_category.thumbnail}
              name={user.displayName}
              category={post.badge.badge_category.title}
              badge={post.badge.title}
              date={post.createdAt}
            />
          );
        }
      })}
    </div>
  );
};

/*
<BadgeCategoryPost
        image="beach.png"
        name={user.displayName}
        group="Hong Kong"
        category="Beaches"
      />
*/

export default Profile;
