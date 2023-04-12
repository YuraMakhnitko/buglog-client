import axios from "../settings/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCategory = createAsyncThunk("category", async (params) => {
  const { data } = await axios.post("/category", params);
  return data;
});

export const fetchRemoveArticle = createAsyncThunk(
  "/articles/deleteone",
  async (articleId) => {
    await axios.delete(`/articles/${articleId}`);
  }
);

export const fetchSearchValue = createAsyncThunk(
  "/search",
  async (searchValue) => {
    const { data } = await axios.get(`/search/${searchValue}`);
    return data;
  }
);
