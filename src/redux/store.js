import { configureStore } from "@reduxjs/toolkit";

import filter from "./filter/slice";
import auth from "./auth/slice";
import comments from "./comments/slice";

export const store = configureStore({
  reducer: { filter, auth, comments },
});
