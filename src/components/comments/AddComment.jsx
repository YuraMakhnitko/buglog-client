import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import Avatar from "@mui/material/Avatar";
import { Button } from "@mui/material";

import Textarea from "@mui/joy/Textarea";
import Box from "@mui/material/Box";

import AvatarNoImg from "../AvatarNoImg";
import { setCommentsUpdated } from "../../redux/comments/slice";
import axios from "../../redux/settings/axios";

const AddComment = () => {
  const { categoryId, id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      commentText: "",
    },
  });

  const dispatch = useDispatch();
  const { isAuth, user } = useSelector((state) => state.auth);
  const { commentsUpdated } = useSelector((state) => state.comments);

  const createNewComment = async (data) => {
    const fields = {
      ...data,
      userId: user._id,
      articleId: id,
    };

    await axios.post("/addcomment", fields);
    resetField("commentText");
    dispatch(setCommentsUpdated(!commentsUpdated));
    console.log("comment added!");
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(createNewComment)}
      noValidate
      sx={{ mt: 1 }}
    >
      <>
        <div className="comments__item">
          <div className="comments__info">
            <div className="comments__user">
              {user.avatarUrl ? (
                <Avatar
                  alt={user.name ? user.name : ""}
                  src={user.avatarUrl ? user.avatarUrl : ""}
                  sx={{ width: 32, height: 32 }}
                />
              ) : (
                <AvatarNoImg name={user.name} />
              )}
              <div className="comments__user-info">
                <p className="comments__user-name">{user.name}</p>
              </div>
            </div>
          </div>
          <Textarea
            placeholder="Type something here…"
            minRows={3}
            variant="plain"
            error={!!errors.commentText}
            {...register("commentText", {
              required: "Field is empty",
              maxLength: {
                value: 600,
                message: "600 letters maximum",
              },
            })}
            endDecorator={
              <Box
                sx={{
                  display: "flex",
                  gap: "var(--Textarea-paddingBlock)",
                  pt: "var(--Textarea-paddingBlock)",
                  borderTop: "1px solid",
                  borderColor: "divider",
                  flex: "auto",
                }}
              >
                <Button
                  disabled={!isValid}
                  className="comments__add-comment"
                  type="submit"
                  variant="contained"
                >
                  Send
                </Button>
              </Box>
            }
            sx={{
              minWidth: 200,
              "--Textarea-focusedThickness": "var(--joy-focus-thickness, 0px)",
            }}
          />
          {errors.commetnText && <p>{errors.commetnText.message}</p>}
        </div>
      </>
    </Box>
  );
};

export default AddComment;
