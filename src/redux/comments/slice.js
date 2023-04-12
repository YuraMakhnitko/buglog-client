import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isEdit: false,
  commentToUpdateId: null,
  commentsUpdated: false,
};

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    setCommentsUpdated(state, action) {
      state.commentsUpdated = action.payload;
    },
    setIsEdit(state, action) {
      state.isEdit = !state.isEdit;
      state.isCommentId = action.payload;
    },
    setCommentToUpdateId(state, action) {
      state.commentToUpdateId = action.payload;
    },
  },
});

export const { setIsEdit, setCommentsUpdated, setCommentToUpdateId } =
  commentsSlice.actions;

export default commentsSlice.reducer;
