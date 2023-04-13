import { useDispatch, useSelector } from "react-redux";
import axios from "../../redux/settings/axios";
import { useForm } from "react-hook-form";

import { Button } from "@mui/material";

import Textarea from "@mui/joy/Textarea";
import Box from "@mui/material/Box";

import { setIsEdit, setCommentsUpdated } from "../../redux/comments/slice";

const EditComment = ({ comment }) => {
  const dispatch = useDispatch();
  const { isEdit, commentsUpdated } = useSelector((state) => state.comments);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();

  const editCommentHandle = async (data) => {
    if (data) {
      console.log(data.commentText);
      const updatedComment = {
        commentText: data.commentText,
      };
      await axios.patch(`/comments/${comment._id}`, updatedComment);
      dispatch(setIsEdit(!isEdit));
      dispatch(setCommentsUpdated(!commentsUpdated));
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit((data) => editCommentHandle(data))}
      noValidate
      sx={{ mt: 1 }}
    >
      <Textarea
        minRows={3}
        defaultValue={comment.commentText}
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
      {errors.commentText && <p>{errors.commentText.message}</p>}
    </Box>
  );
};

export default EditComment;
