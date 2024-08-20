import React, { useState, useRef, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { fetchRegister, selectIsAuth } from "../../redux/slices/auth";
import Button from "@mui/material/Button";
import SimpleMDE from "react-simplemde-editor";
import { useNavigate, Navigate, useParams } from "react-router-dom";
import "easymde/dist/easymde.min.css";
import styles from "./AddPost.module.scss";
import axios from "../../axios";
export const AddPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth);
  const [isLoading, setLoading] = React.useState(false);
  const [title, setTitle] = useState("");
  const [text, setText] = React.useState("");
  const [ImageUrl, setImageUrl] = useState("");
  const [tags, setTags] = useState("");
  const inputFileRef = useRef(null);

  const isEditing = Boolean(id);

  useEffect(() => {
    if (id) {
      axios.get(`/posts/${id}`).then(({ data }) => {
        setTitle(data.title);
        setText(data.text);
        setImageUrl(data.ImageUrl);
        const acrgTags = data.tags.join(",");
        setTags(acrgTags);

        console.log("arg", acrgTags);
      });
    }
  }, []);
  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append("image", file);
      const { data } = await axios.post("/upload", formData);

      setImageUrl(data.url);
    } catch (err) {}
  };

  const onClickRemoveImage = () => {
    setImageUrl("");
    inputFileRef.current.value = "";
  };

  const onChange = React.useCallback((value) => {
    setText(value);
  }, []);

  const onSubmit = async () => {
    try {
      setLoading(true);
      const fields = {
        title,
        ImageUrl,
        tags,
        text,
      };
      console.log(fields);
      console.log(id);
      (isEditing
        ? axios.patch(`/posts/${id}`, fields)
        : axios.post("/posts", fields)
      )
        .then((response) => {
          const { data } = response;
          console.log(data);
          const _id = isEditing ? id : data._id;

          navigate(`/posts/${_id}`);
        })
        .catch((err) => {
          console.error(err);
          // Обработка ошибок
        });
    } catch (err) {
      console.warn(err);
    }
  };

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: "400px",
      autofocus: true,
      placeholder: "Введите текст...",
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    []
  );

  if (!window.localStorage.getItem("token") && !isAuth) {
    return <Navigate to="/" />;
  }
  return (
    <Paper style={{ padding: 30 }}>
      <Button
        onClick={() => inputFileRef.current.click()}
        variant="outlined"
        size="large"
      >
        Загрузить превью
      </Button>
      <input
        ref={inputFileRef}
        type="file"
        onChange={handleChangeFile}
        hidden
      />
      {ImageUrl && (
        <>
          <Button
            variant="contained"
            color="error"
            onClick={onClickRemoveImage}
          >
            Удалить
          </Button>
          <img
            className={styles.image}
            src={`http://localhost:4444${ImageUrl}`}
            alt="Uploaded"
          />
        </>
      )}

      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Заголовок статьи..."
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        classes={{ root: styles.tags }}
        variant="standard"
        placeholder="Тэги"
        fullWidth
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
      <SimpleMDE
        className={styles.editor}
        value={text}
        onChange={onChange}
        options={options}
      />
      <div className={styles.buttons}>
        <Button onClick={onSubmit} size="large" variant="contained">
          {isEditing ? "Сохранить" : "Опубликовать"}
        </Button>
        <a href="/">
          <Button size="large">Отмена</Button>
        </a>
      </div>
    </Paper>
  );
};
