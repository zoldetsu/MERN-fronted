import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import { useDispatch, useSelector } from "react-redux";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";
import axios from "../axios";
import { Post } from "../components/Post";
import { TagsBlock } from "../components/TagsBlock";
import { CommentsBlock } from "../components/CommentsBlock";
import {
  favorites,
  fetchComments,
  fetchPosts,
  fetchTags,
  news,
} from "../redux/slices/Post";

export const Home = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data);
  const { tags, myPosts, Comments } = useSelector((state) => state.posts);
  const [tabValue, setTabValue] = useState(0);
  const isPostsLoading = myPosts.status === "loading";
  const isTagsLoading = tags.status === "loading";
  const { lastTags, setLastTags } = useState();
  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
    dispatch(fetchComments());
    // axios
    //   .get("/comments")
    //   .then((res) => setLastTags(res))
    //   .catch((err) => {
    //     console.warn("ошибка получения комментариев", err);
    //   });
  }, [dispatch]);

  const onFavorite = () => {
    dispatch(favorites());
    setTabValue(1);
  };

  const onNews = () => {
    dispatch(news());
    setTabValue(0);
  };

  console.log(Comments);
  return (
    <>
      <Tabs
        style={{ marginBottom: 15 }}
        value={tabValue}
        aria-label="basic tabs example"
      >
        <Tab onClick={onNews} label="Новые" />
        <Tab onClick={onFavorite} label="Популярные" />
      </Tabs>
      <Grid container spacing={6}>
        <Grid xs={8} item>
          {(isPostsLoading ? [...Array(5)] : myPosts.items).map((obj, index) =>
            isPostsLoading ? (
              <Post key={index} isLoading={true} />
            ) : (
              <Post
                _id={obj._id}
                title={obj.title}
                imageUrl={`http://localhost:4444${obj.ImageUrl}`}
                user={obj.user}
                createdAt={obj.createdAt}
                viewsCount={obj.viewsCount}
                commentsCount={3}
                tags={obj.tags}
                isEditable={userData?._id === obj.user._id}
              />
            )
          )}
        </Grid>

        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
          <CommentsBlock items={Comments.items} isLoading={false} />
        </Grid>
      </Grid>
    </>
  );
};
