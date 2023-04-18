import { useDispatch, useSelector } from "react-redux";
import Avatar from "@mui/material/Avatar";
import AvatarNoImg from "../AvatarNoImg";

import { setCommentsUpdated } from "../../redux/comments/slice";
import { fetchRemoveComment } from "../../redux/comments/athyncActions";

import EditBlock from "../EditBlock";
import EditComment from "./EditComment";

import { useFormatDate } from "../../hooks/useFormatDate";

const Comment = ({ comment }) => {
  const hostAvatarUrl = "https://bublog-back.onrender.com/";

  const dispatch = useDispatch();
  const { month, year, day, time } = useFormatDate(comment.createdAt);
  const { isAuth, user } = useSelector((state) => state.auth);
  const { commentsUpdated, isEdit, commentToUpdateId } = useSelector(
    (state) => state.comments
  );
  const onClickAction = async (id) => {
    await dispatch(fetchRemoveComment(id));
    dispatch(setCommentsUpdated(!commentsUpdated));
  };

  const commentLength = comment.commentText;
  const commentArray = commentLength.split(",");

  const changedText = commentArray
    .map((el) => {
      if (el.length > 30) {
        let buf = "";
        console.log(el.length, " el.length");
        for (let i = 0; i <= el.length - 1; i++) {
          if (i > 0 && i % 30 === 0) {
            buf = buf.concat(el[i].concat(" "));
          }
          buf = buf.concat(el[i]);
        }
        return buf;
      }
      return el.concat(" ");
    })
    .toString();
  console.log(changedText, "commentArray");

  console.log(commentArray, "comment");

  return (
    <div className="comments__item" key={comment._id}>
      <div className="comments__info">
        <div className="comments__user">
          {comment.user.avatarUrl ? (
            <Avatar
              alt={comment.user.name}
              src={`${hostAvatarUrl}${comment.user.avatarUrl}`}
              sx={{ width: 32, height: 32 }}
            />
          ) : (
            <AvatarNoImg name={comment.user.name} />
          )}
          <div className="comments__user-info">
            <p className="comments__user-name">{comment.user.name}</p>
            <p className="comments__add-data">{`${year} ${month} ${day}, ${time}`}</p>
          </div>
        </div>
        {isAuth && user._id === comment.user._id ? (
          <EditBlock
            searchId={comment._id}
            onClickAction={onClickAction}
            objType={"comment"}
            className="edit-block_comments"
          />
        ) : null}
      </div>

      {isAuth && user._id === comment.user._id ? (
        isEdit && commentToUpdateId === comment._id ? (
          <EditComment comment={comment} />
        ) : (
          <p className="comments__full-text">{changedText}</p>
        )
      ) : (
        <p className="comments__full-text">{changedText}</p>
      )}
    </div>
  );
};

export default Comment;
