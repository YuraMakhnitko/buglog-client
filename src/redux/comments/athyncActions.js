import axios from "../settings/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchRemoveComment = createAsyncThunk(
  "/comment/deleteone",
  async (commentId) => {
    console.log(commentId);
    await axios.delete(`/comments/${commentId}`);
  }
);
