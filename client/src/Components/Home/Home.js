import React, { useState, useEffect, useContext } from "react";
import UserContext from "../../Utils/UserContext";
import { Typography, Container } from "@material-ui/core/";
import ActivityPost from "../Posts/ActivityPost";
import Axios from "axios";

import Layout from "../Layout/Layout";

const Home = () => {
  return <Layout Page={Page} />;
};

const Page = () => {
  const { userData } = useContext(UserContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const url = `/api/post/all`;
      await Axios.get(url)
        .then((response) => {
          setPosts(response.data.data);
        })
        .catch(() => {});
    };

    getPosts();
  }, []);

  return (
    <div>
      <Container maxWidth="md">
        <Typography variant="h3" component="h2" gutterBottom>
          Hello{userData ? `, ${userData.user.displayName}` : ""}
        </Typography>
        <br />
        {posts.map((post) => (
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
        ))}
      </Container>
    </div>
  );
};

/* username,
  date,
  title,
  location,
  activity,
  content,
  badge,*/

export default Home;
