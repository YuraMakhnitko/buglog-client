import { createSlice } from "@reduxjs/toolkit";

import { fetchLogin, fetchRegister, fetchAuthMe } from "./athyncActions";

const Status = {
  LOADING: "LOADING",
  SUCCSESS: "SUCCESS",
  ERROR: "ERROR",
};

const initialState = {
  isAuth: false,
  user: null,
  status: Status.LOADING,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogOut(state) {
      state.user = null;
      state.isAuth = false;
    },
  },
  extraReducers: (builder) => {
    // login
    builder.addCase(fetchLogin.pending, (state) => {
      state.status = Status.LOADING;
      state.user = {};
    });
    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      state.user = action.payload;
      state.status = Status.SUCCSESS;
      state.isAuth = Boolean(state.user);
    });
    builder.addCase(fetchLogin.rejected, (state) => {
      state.status = Status.ERROR;
      state.user = {};
    });

    // AUTH ME
    builder.addCase(fetchAuthMe.pending, (state) => {
      state.status = Status.LOADING;
      state.user = {};
    });
    builder.addCase(fetchAuthMe.fulfilled, (state, action) => {
      state.user = action.payload;
      state.status = Status.SUCCSESS;
      state.isAuth = Boolean(state.user);
    });
    builder.addCase(fetchAuthMe.rejected, (state) => {
      state.status = Status.ERROR;
      state.user = {};
    });

    // register

    builder.addCase(fetchRegister.pending, (state) => {
      state.status = Status.LOADING;
      state.user = {};
    });
    builder.addCase(fetchRegister.fulfilled, (state, action) => {
      state.user = action.payload;
      state.status = Status.SUCCSESS;
      state.isAuth = Boolean(state.user);
    });
    builder.addCase(fetchRegister.rejected, (state) => {
      state.status = Status.ERROR;
      state.user = {};
    });
  },
});

export const { setLogOut } = authSlice.actions;

export default authSlice.reducer;
