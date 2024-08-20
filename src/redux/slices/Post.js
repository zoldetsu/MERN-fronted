import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const { data } = await axios.get("/posts");
  return data;
});

export const fetchTags = createAsyncThunk("tags/fetchTags", async () => {
  const { data } = await axios.get("/tags");
  return data;
});

export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async () => {
    const { data } = await axios.get("/comments");
    return data;
  }
);

export const fetchTagsPosts = createAsyncThunk(
  "tags/fetchTagsPosts",
  async (id) => {
    const { data } = await axios.get(`/tags/${id}`);
    return data;
  }
);

export const fetchRemovePost = createAsyncThunk(
  "posts/fetchRemovePost",
  async (id) => {
    await axios.delete(`/posts/${id}`);
  }
);

const initialState = {
  myPosts: {
    items: [],
    status: "loading",
  },
  tags: {
    items: [],
    status: "loading",
  },

  tagPosts: {
    items: [],
    status: "loading",
  },

  Comments: {
    items: [],
    status: "loading",
  },
};

const postsSlises = createSlice({
  name: "posts",
  initialState,
  reducers: {
    favorites: (state) => {
      state.myPosts.items = state.myPosts.items.sort(
        (a, b) => b.viewsCount - a.viewsCount
      );
    },
    news: (state) => {
      state.myPosts.items = state.myPosts.items.sort(
        (a, b) => a.viewsCount - b.viewsCount
      );
    },
  },
  extraReducers: {
    [fetchPosts.pending]: (state) => {
      state.myPosts.status = "loading";
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.myPosts.items = action.payload.sort(
        (a, b) => a.viewsCount - b.viewsCount
      );
      state.myPosts.status = "loaded";
    },
    [fetchPosts.rejected]: (state, action) => {
      state.myPosts.items = [];
      state.myPosts.status = "error";
    },
    [fetchTags.pending]: (state) => {
      state.tags.status = "loading";
    },
    [fetchTags.fulfilled]: (state, action) => {
      state.tags.items = action.payload;
      state.tags.status = "loaded";
    },
    [fetchTags.rejected]: (state, action) => {
      state.tags.items = [];
      state.tags.status = "error";
    },
    [fetchRemovePost.pending]: (state, action) => {
      state.myPosts.items = state.myPosts.items.filter(
        (obj) => obj._id !== action.meta.arg
      );
    },

    [fetchTagsPosts.pending]: (state) => {
      state.tagPosts.status = "loading";
    },
    [fetchTagsPosts.fulfilled]: (state, action) => {
      state.tagPosts.items = action.payload;
      state.tagPosts.status = "loaded";
    },
    [fetchTagsPosts.rejected]: (state, action) => {
      state.tagPosts.items = [];
      state.tagPosts.status = "error";
    },

    [fetchComments.pending]: (state) => {
      state.Comments.status = "loading";
    },
    [fetchComments.fulfilled]: (state, action) => {
      state.Comments.items = action.payload;
      state.Comments.status = "loaded";
    },
    [fetchComments.rejected]: (state, action) => {
      state.Comments.items = [];
      state.Comments.status = "error";
    },
  },
});

export const postsReducer = postsSlises.reducer;
export const { favorites, news } = postsSlises.actions;
