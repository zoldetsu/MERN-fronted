import React from "react";
import Typography from "@mui/material/Typography";
import { fetchRegister, selectIsAuth } from "../../redux/slices/auth";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { useForm } from "react-hook-form";
import styles from "./Login.module.scss";
import { Navigate } from "react-router-dom";

export const Registration = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      fullName: "Nazar Nazarov",
      email: "test@test.ru",
      password: "12345678",
    },
    mode: "onChange",
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values));
    console.log(data);
    if (!data.payload) {
      return alert("не удалось зарегистрироваться");
    }
    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }
  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          error={Boolean(errors.fullName?.message)}
          helperText={errors.fullName?.message}
          className={styles.field}
          label="Полное имя"
          fullWidth
          {...register("fullName", { required: "Укажите полное имя" })}
        />

        <TextField
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          type="email"
          className={styles.field}
          label="E-Mail"
          fullWidth
          {...register("email", { required: "Укажите почту" })}
        />

        <TextField
          type="password"
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          className={styles.field}
          label="Пароль"
          {...register("password", { required: "Укажите пароль" })}
          fullWidth
        />

        <Button
          type="submit"
          disabled={!isValid}
          size="large"
          variant="contained"
          fullWidth
        >
          Зарегистрироваться
        </Button>
      </form>
    </Paper>
  );
};
