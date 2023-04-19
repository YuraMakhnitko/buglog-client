import React, { useEffect, useState } from "react";
import axios from "../redux/settings/axios";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import imageCompression from "browser-image-compression";

// import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

import { useForm } from "react-hook-form";
import Avatar from "@mui/material/Avatar";
import AvatarNoImg from "../components/AvatarNoImg";

import { Button } from "@mui/material";
import Textarea from "@mui/joy/Textarea";
import Box from "@mui/material/Box";

import SelectCategory from "../components/SelectCategory";

const AddArticle = () => {
  const hostUrl = "src";
  const hostArticleImgUrl = "https://bublog-back.onrender.com/";
  const categoryText = "Choose Category";
  const navigate = useNavigate();

  const { id } = useParams();
  const isEditing = Boolean(id);
  const { isAuth, user } = useSelector((state) => state.auth);
  const { categories } = useSelector((state) => state.filter);

  const [articleImgUrl, setArticleImgUrl] = useState("");
  const [imgUrlOnServer, setImgUrlOnServer] = useState("");
  const [imgType, setImgType] = useState("");
  const [title, setTitle] = useState("");
  const [articleText, setArticleText] = useState("");
  console.log(isEditing, "isEditing");

  const [categorySelected, setCategorySelected] = useState({
    title: categoryText,
    categoryId: "",
  });

  useEffect(() => {
    if (id) {
      axios.get(`/articles/${id}`).then(({ data }) => {
        setTitle(data.title);
        setArticleText(data.articleText);
        setArticleImgUrl(data.articleImgUrl);
        setImgUrlOnServer(`${hostArticleImgUrl}${data.articleImgUrl}`);
        const findCategory = categories.find(
          (item) => item.categoryId === data.category
        );
        setCategorySelected(findCategory);
      });
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({});

  const handleAddImage = async (event) => {
    try {
      const options = {
        maxSizeMB: 0.05,
        maxWidthOrHeight: 1200,
        useWebWorker: true,
      };
      const formData = new FormData();
      const fileToCompress = event.target.files[0];
      const file = await imageCompression(fileToCompress, options);
      setImgType(file.type);
      formData.append("image", file, file.name);
      const { data } = await axios.post("/upload/articles", formData);
      setArticleImgUrl(`${hostUrl}${data.url}`);
      setImgUrlOnServer(`${hostArticleImgUrl}${hostUrl}${data.url}`);
    } catch (error) {
      console.warn(error);
      alert("Error when uploading file");
    }
  };
  console.log(articleImgUrl, "articleImgUrlLLLLLLLLLLL");
  const createNewArticle = async (formData) => {
    const fields = {
      ...formData,
      articleImgUrl: articleImgUrl,
      imgArticleUrl: articleImgUrl,
      imgType: imgType,
    };

    try {
      const { data } = isEditing
        ? await axios.patch(`/articles/${id}`, fields)
        : await axios.post("/addarticle", fields);

      const _id = isEditing ? id : data._id;
      const category = isEditing ? categorySelected.categoryId : data.category;

      navigate(`/${category}/${_id}`);
    } catch (error) {
      console.warn(error);
      alert("Error when creating article");
    }
  };

  const onClickDeletImage = () => {
    setArticleImgUrl("");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="full-article__comments comments">
      <Box
        component="form"
        onSubmit={handleSubmit(createNewArticle)}
        noValidate
        sx={{ mt: 1 }}
      >
        {isAuth ? (
          <>
            <div className="add-article__header">
              <p className="add-article__title">ADD ARTICLE</p>
            </div>
            <div className="add-article__item">
              <div className="add-article__info">
                <div className="add-article__user">
                  {user.avatarUrl ? (
                    <Avatar
                      alt={user.name}
                      src={`${hostArticleImgUrl}${user.avatarUrl}`}
                      sx={{ width: 32, height: 32 }}
                    />
                  ) : (
                    <AvatarNoImg name={user.name} />
                  )}
                  <div className="add-article__user-info">
                    <p className="add-article__user-name">{user.name}</p>
                  </div>
                </div>
              </div>
              {articleImgUrl && <img src={`${imgUrlOnServer}`} />}

              {!isEditing || (!articleImgUrl && isEditing) ? (
                <Button
                  size="small"
                  variant="contained"
                  component="label"
                  className="add-article__upload-button"
                >
                  <PhotoCamera
                    sx={{ width: 22, height: 22 }}
                    className="add-article__photo-icon"
                  />
                  <input
                    hidden
                    accept="image/*"
                    multiple
                    type="file"
                    onChange={handleAddImage}
                  />
                  Upload Image
                </Button>
              ) : (
                <Button
                  className="add-article__upload-button"
                  variant="contained"
                  color="error"
                  onClick={onClickDeletImage}
                >
                  Delete Image
                </Button>
              )}
              <div className="add-article__category">
                <SelectCategory
                  categorySelected={categorySelected.title}
                  setCategorySelected={setCategorySelected}
                />
                <input
                  className="hide-input"
                  type="select"
                  value={categorySelected.categoryId}
                  {...register("categoryId", {
                    required: "You must choose category!",
                  })}
                />
              </div>
              <Textarea
                placeholder="Type article title…"
                minRows={1}
                variant="outlined"
                defaultValue={title}
                error={!!errors.title}
                {...register("title", {
                  required: "Field is empty",
                  maxLength: {
                    value: 600,
                    message: "600 letters maximum",
                  },
                })}
                sx={{
                  minWidth: 200,
                  "--Textarea-focusedThickness":
                    "var(--joy-focus-thickness, 1px)",
                }}
              />
              {errors.title && <p>{errors.title.message}</p>}
              <Textarea
                placeholder="Type article text..."
                defaultValue={articleText}
                minRows={7}
                variant="outlined"
                error={!!errors.articleText}
                {...register("articleText", {
                  required: "Field is empty",
                  maxLength: {
                    value: 4000,
                    message: "4000 letters maximum",
                  },
                })}
                sx={{
                  minWidth: 200,
                  "--Textarea-focusedThickness":
                    "var(--joy-focus-thickness, 1px)",
                }}
              />
              {errors.articleText && <p>{errors.articleText.message}</p>}
            </div>
          </>
        ) : (
          <p className="add-article__title">
            To add new article you have to Log In...
          </p>
        )}

        <Button
          disabled={!isValid}
          className="add-article__add-comment"
          type="submit"
          variant="contained"
        >
          Send
        </Button>
      </Box>
    </div>
  );
};

export default AddArticle;
