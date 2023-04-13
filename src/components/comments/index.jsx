import React from "react";
import { useSelector } from "react-redux";

import AddComment from "./AddComment";

import Comment from "./Comment";

const Comments = ({ comments }) => {
  const { isAuth } = useSelector((state) => state.auth);

  return (
    <div className="full-article__comments comments">
      <div className="comments__header">
        <p className="comments__title">Comments</p>
      </div>
      {isAuth ? (
        <AddComment commentsLength={comments.length} />
      ) : (
        <p className="comments__title">To add commets you have to Log In...</p>
      )}

      <div className="comments__items">
        {comments &&
          comments.map((comment) => (
            <Comment comment={comment} key={comment._id} />
          ))}
      </div>
    </div>
  );
};

export default Comments;
