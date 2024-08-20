import { configureStore } from "@reduxjs/toolkit";
import { postsReducer } from "./slices/Post";
import { authReducer } from "./slices/auth";
import { commentReducer } from "./slices/comment";
const store = configureStore({
  reducer: { posts: postsReducer, auth: authReducer, comment: commentReducer },
});

export default store;
