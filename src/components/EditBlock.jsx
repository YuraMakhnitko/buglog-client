import { useDispatch } from "react-redux";

import { Button, ButtonGroup } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import { useNavigate } from "react-router-dom";
import { setIsEdit, setCommentToUpdateId } from "../redux/comments/slice";

const EditBlock = ({ onClickAction, searchId, objType }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const editBlockLocationStyle =
    objType === "comment" ? "edit-block edit-block_comments" : "edit-block";

  const removeObject = () => {
    if (searchId) {
      if (window.confirm(`Are you sure you want to delete ${objType}?`)) {
        onClickAction(searchId);
      }
    }
  };
  const updateObject = () => {
    dispatch(setIsEdit(true));
    dispatch(setCommentToUpdateId(searchId));
  };

  const onClickNavigate = () => {
    navigate(`/${objType}/${searchId}/edit`);
  };

  return (
    <div className={editBlockLocationStyle}>
      <ButtonGroup
        size="small"
        variant="contained"
        aria-label="outlined primary button group"
      >
        {objType === "article" ? (
          <Button onClick={onClickNavigate}>
            <EditIcon />
          </Button>
        ) : (
          <Button onClick={updateObject}>
            <EditIcon />
          </Button>
        )}
        <Button onClick={removeObject}>{<ClearIcon />}</Button>
      </ButtonGroup>
    </div>
  );
};

export default EditBlock;
