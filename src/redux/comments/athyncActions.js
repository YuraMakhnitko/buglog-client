import axios from "../settings/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchRemoveComment = createAsyncThunk(
  "/comment/deleteone",
  async (commentId) => {
    console.log(commentId);
    await axios.delete(`/comments/${commentId}`);
  }
);

// export const fetchCommentsLength = createAsyncThunk(
//   "/comments/byarticle",
//   async (articleId) => {
//     await axios.get(`/comments/${articleId}`);
//   }
// );
// export const fetchUdpadeComment = createAsyncThunk(
//   "/comment/deleteone",
//   async (commentId, commentText) => {
//     console.log(commentId, "commentId");
//     console.log(commentText, "dataComment");
//     await axios.patch(`/comments/${commentId}`);
//   }
// );
