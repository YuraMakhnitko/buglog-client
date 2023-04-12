import axios from "../settings/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// AUTH

export const fetchLogin = createAsyncThunk("auth/login", async (params) => {
  const { data } = await axios.post(`/auth/login`, params);
  return data;
});

export const fetchRegister = createAsyncThunk(
  "auth/register",
  async (params) => {
    const { data } = await axios.post(`/auth/register`, params);
    return data;
  }
);
export const fetchAuthMe = createAsyncThunk("auth/me", async () => {
  const { data } = await axios.get(`/auth/me`);
  return data;
});
