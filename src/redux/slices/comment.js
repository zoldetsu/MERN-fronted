import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";

const initialState = {
  comments: [],
  status: "loading",
};

export const createComment = createAsyncThunk(
  "comment/createComment",
  async ({ postId, comment }) => {
    try {
      const { data } = await axios.post(`/comments/${postId}`, {
        comment,
        postId,
      });
      return data;
    } catch (error) {
      console.error(error);
      throw new Error(
        error.response
          ? error.response.data.message
          : "Ошибка при создании комментария"
      );
    }
  }
);

export const getComment = createAsyncThunk("comment/getComment", async (id) => {
  try {
    const { data } = await axios.get(`/comments/${id}`);
    return data;
  } catch {}
});

export const getLastComments = createAsyncThunk(
  "comment/getLastComments",
  async () => {
    try {
      const { data } = axios.get(`/comments`);
      return data;
    } catch {}
  }
);
export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers: {
    [createComment.pending]: (state) => {
      state.status = "loading";
    },
    [createComment.fulfilled]: (state, action) => {
      state.comments.push(action.payload);
      state.status = "loaded";
    },
    [createComment.rejected]: (state, action) => {
      state.status = "error";
    },
    [getComment.pending]: (state) => {
      state.status = "loading";
    },
    [getComment.fulfilled]: (state, action) => {
      state.comments = action.payload;
      state.status = "loaded";
    },
    [getComment.rejected]: (state, action) => {
      state.status = "error";
    },
  },
});

export const commentReducer = commentSlice.reducer;
