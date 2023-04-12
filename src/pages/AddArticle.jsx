import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import { Button } from '@mui/material';
import Textarea from '@mui/joy/Textarea';
import Box from '@mui/material/Box';

import SelectCategory from '../components/SelectCategory';
import axios from '../redux/settings/axios';

const AddArticle = () => {
  const hostUrl = 'https://bublog-back.onrender.com/src';
  const categoryText = 'Choose Category';
  const navigate = useNavigate();
  const { id } = useParams();

  // console.log(id);

  const isEditing = Boolean(id);
  const { isAuth, user } = useSelector((state) => state.auth);
  const { categories, articles } = useSelector((state) => state.filter);

  const [articleImgUrl, setArticleImgUrl] = useState('');
  const [title, setTitle] = useState('');
  const [articleText, setArticleText] = useState();

  const [categorySelected, setCategorySelected] = useState({
    title: categoryText,
    categoryId: '',
  });

  useEffect(() => {
    if (id) {
      axios.get(`/articles/${id}`).then(({ data }) => {
        setTitle(data.title);
        setArticleText(data.articleText);
        setArticleImgUrl(data.articleImgUrl);
        const findCategory = categories.find(
          (item) => item.categoryId === data.category
        );
        setCategorySelected(findCategory);
      });
    }
  }, []);

  console.log(articleImgUrl, 'articleImageUrl');
  console.log(articleText, 'articleText');

  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors, isValid },
  } = useForm({});

  console.log(articles);

  const dispatch = useDispatch();

  const handleAddImage = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append('image', file);
      const { data } = await axios.post('/upload/articles', formData);
      setArticleImgUrl(`${hostUrl}${data.url}`);
    } catch (error) {
      console.warn(error);
      alert('Error when uploading file');
    }
  };

  const createNewArticle = async (formData) => {
    const fields = {
      ...formData,
      articleImgUrl: articleImgUrl,
    };

    try {
      const { data } = isEditing
        ? await axios.patch(`/articles/${id}`, fields)
        : await axios.post('/addarticle', fields);

      const _id = isEditing ? id : data._id;
      const category = isEditing ? categorySelected.categoryId : data.category;

      navigate(`/${category}/${_id}`);
    } catch (error) {
      console.warn(error);
      alert('Error when creating article');
    }
  };

  const onClickDeletImage = () => {
    setArticleImgUrl('');
  };

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
                  <img
                    src={user.avatarUrl}
                    alt="avatar"
                    className="add-article__avatar"
                  />
                  <div className="add-article__user-info">
                    <p className="add-article__user-name">{user.name}</p>
                  </div>
                </div>
              </div>
              {articleImgUrl && <img src={articleImgUrl} />}

              {articleImgUrl ? (
                <Button
                  variant="contained"
                  color="error"
                  onClick={onClickDeletImage}
                >
                  Delete Image
                </Button>
              ) : (
                <Button variant="contained" component="label">
                  Upload Image
                  <input
                    hidden
                    accept="image/*"
                    multiple
                    type="file"
                    onChange={handleAddImage}
                  />
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
                  {...register('categoryId', {
                    required: 'You must choose category!',
                  })}
                />
                {/* {errors.categoryId && <p>{errors.categoryId.message}</p>} */}
              </div>
              <Textarea
                placeholder="Type article title…"
                minRows={1}
                variant="outlined"
                defaultValue={title}
                error={!!errors.title}
                {...register('title', {
                  required: 'Field is empty',
                  maxLength: {
                    value: 600,
                    message: '600 letters maximum',
                  },
                })}
                sx={{
                  minWidth: 200,
                  '--Textarea-focusedThickness':
                    'var(--joy-focus-thickness, 1px)',
                }}
              />
              {errors.title && <p>{errors.title.message}</p>}
              <Textarea
                placeholder="Type article text..."
                defaultValue={articleText}
                minRows={7}
                variant="outlined"
                error={!!errors.articleText}
                {...register('articleText', {
                  required: 'Field is empty',
                  maxLength: {
                    value: 4000,
                    message: '4000 letters maximum',
                  },
                })}
                sx={{
                  minWidth: 200,
                  '--Textarea-focusedThickness':
                    'var(--joy-focus-thickness, 1px)',
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
      <div className="add-article__items"></div>
    </div>
  );
};

export default AddArticle;
