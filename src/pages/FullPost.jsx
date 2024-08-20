import React, { useEffect, useState } from "react";

import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import { useParams } from "react-router-dom";
import axios from "../axios";
import { useDispatch, useSelector } from "react-redux";
import { selectIsAuth } from "../redux/slices/auth";
import { getComment } from "../redux/slices/comment";
export const FullPost = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comment);
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState();
  const isAuth = useSelector(selectIsAuth);
  useEffect(() => {
    axios
      .get(`/posts/${id}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
        console.log("получено");
      })
      .catch((err) => {
        console.warn("rere", err);
        alert("ошибка при получении статьи");
      });
    dispatch(getComment(id));
  }, [id]);

  if (isLoading) {
    return <Post isLoading={true} />;
  }

  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={data.ImageUrl ? `http://localhost:4444${data.ImageUrl}` : ""}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={3}
        tags={data.tags}
        isFullPost
      >
        <p>{data.text}</p>
      </Post>
      <CommentsBlock
        //
        items={comments.comments}
        isLoading={comments.status & "loading"}
      >
        <Index avatar={data.user.avatarUrl} />
      </CommentsBlock>
    </>
  );
};
