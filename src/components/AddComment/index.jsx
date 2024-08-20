import React, { useState } from "react";

import styles from "./AddComment.module.scss";
import { useNavigate, Navigate, useParams } from "react-router-dom";

import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { selectIsAuth } from "../../redux/slices/auth";
import { createComment } from "../../redux/slices/comment";

export const Index = (avatarUrl) => {
  const dispatch = useDispatch();

  const { id } = useParams();

  const isAuth = useSelector(selectIsAuth);

  const [сomment, setComment] = useState("");
  const onSubmit = async () => {
    try {
      dispatch(createComment({ postId: id, comment: сomment }));
      setComment("");
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <>
      <div className={styles.root}>
        <Avatar classes={{ root: styles.avatar }} src={avatarUrl} />
        <div className={styles.form}>
          <TextField
            label="Написать комментарий"
            variant="outlined"
            maxRows={10}
            multiline
            fullWidth
            value={сomment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button onClick={onSubmit} variant="contained">
            Отправить
          </Button>
        </div>
      </div>
    </>
  );
};
