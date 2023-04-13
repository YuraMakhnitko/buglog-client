import { createSlice } from "@reduxjs/toolkit";

import { fetchCategory, fetchSearchValue } from "./athyncActions";

import categoriesJson from "../settings/categoriesData.json";
const categoriesData = JSON.parse(JSON.stringify(categoriesJson));

const Status = {
  LOADING: "LOADING",
  SUCCSESS: "SUCCESS",
  ERROR: "ERROR",
};

const initialState = {
  categories: categoriesData,
  categoryTitle: categoriesData[0].title,
  categoryId: categoriesData[0].categoryId,
  articles: [],
  searchValue: "",
  status: Status.LOADING,
  isLoading: true,
};

export const fileterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategory(state, action) {
      state.categoryTitle = action.payload;
    },
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    // CATEGORY
    builder.addCase(fetchCategory.pending, (state) => {
      state.status = Status.LOADING;
      state.articles = [];
    });
    builder.addCase(fetchCategory.fulfilled, (state, action) => {
      state.articles = action.payload;
      state.isLoading = false;
      state.status = Status.SUCCSESS;
    });
    builder.addCase(fetchCategory.rejected, (state) => {
      state.status = Status.ERROR;
      state.articles = [];
    });

    // search
    builder.addCase(fetchSearchValue.pending, (state) => {
      state.status = Status.LOADING;
      state.articles = [];
    });
    builder.addCase(fetchSearchValue.fulfilled, (state, action) => {
      state.articles = action.payload;
      state.isLoading = false;
      state.status = Status.SUCCSESS;
    });
    builder.addCase(fetchSearchValue.rejected, (state) => {
      state.status = Status.ERROR;
      state.articles = [];
    });
  },
});

export const { setCategory, setCategoryId, setIsLoading } =
  fileterSlice.actions;

export default fileterSlice.reducer;
