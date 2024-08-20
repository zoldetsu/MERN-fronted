import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTagsPosts } from "../../redux/slices/Post";
import { useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { Post } from "../../components/Post";
export const TagPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { tagPosts } = useSelector((state) => state.posts);
  const isPostsLoading = tagPosts.status === "loading";
  useEffect(() => {
    dispatch(fetchTagsPosts(id));
  }, []);

  return (
    <>
      <Grid
        container
        spacing={2}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid xs={5} item>
          {(isPostsLoading ? [...Array(5)] : tagPosts.items).map((obj, index) =>
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
                isEditable
              />
            )
          )}
        </Grid>
      </Grid>
    </>
  );
};
