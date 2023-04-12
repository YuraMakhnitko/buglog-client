import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../redux/settings/axios";

import { useSelector, useDispatch } from "react-redux";

import { fetchRemoveArticle } from "../redux/filter/athyncActions";
import { useFormatDate } from "../hooks/useFormatDate";

import EditBlock from "../components/EditBlock";
import Comments from "../components/comments/index";
import ArticleSkeleton from "../components/skeletons/ArticleSkeleton";

const Article = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuth, user } = useSelector((state) => state.auth);
  const { commentsUpdated } = useSelector((state) => state.comments);
  const { categories } = useSelector((state) => state.filter);

  const { id, categoryId } = useParams();
  const [article, setArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [searchId, setSearchId] = useState();
  const [comments, setComments] = useState([]);
  const [categoryName, setCategoryName] = useState("");

  const { month, year, day, time } = useFormatDate(article.createdAt);

  // const categoryName = categories.find(
  //   (category) => category.categoryId === article.category
  // );

  // console.log(article.comments, "article.comments");
  console.log(isLoading, "isLoading");

  useEffect(() => {
    axios
      .get(`/articles/${id}`)
      .then((res) => {
        setArticle(res.data);
        setComments(res.data.comments);
        const category = categories.find(
          (category) => category.categoryId === res.data.category
        );
        setCategoryName(category);
        setIsLoading(false);
      })
      .catch((error) => {
        console.warn(error);
        alert("Error when gettin article");
      });
  }, [commentsUpdated]);

  const onClickRemove = () => {
    dispatch(fetchRemoveArticle(article._id));
    navigate("/");
  };

  console.log(article, "article");

  return !isLoading ? (
    <>
      {/* <ArticleSkeleton /> */}
      <div className="full-article">
        <div className="full-article__image">
          <div className="full-article__image-ibg">
            <img src={article.articleImgUrl} alt="article" />
          </div>

          {!isLoading && isAuth && user._id === article.user._id ? (
            <EditBlock
              onClickAction={onClickRemove}
              searchId={article._id}
              objType={"article"}
            />
          ) : null}
        </div>
        <p className="full-article__category">{categoryName.title}</p>
        <div className="full-article__content">
          <h2 className="full-article__title">{article.title}</h2>
          <div className="full-article__add-info">
            <img
              src={isLoading ? "" : article.user.avatarUrl}
              alt="avatar"
              className="comments__avatar"
            />
            <div>
              <p className="full-article__author">
                By {isLoading ? "" : article.user.name}
              </p>
              <p className="article__data">{`${year} ${month} ${day}, ${time}`}</p>
            </div>

            <p className="article__data">{article.articleDate}</p>
          </div>
          <p className="full-article__text">{article.articleText}</p>
        </div>
      </div>
      {!isLoading && (
        <Comments
          comments={article.comments}
          articleId={article._id}
          categoryId={categoryId}
        />
      )}
    </>
  ) : (
    <ArticleSkeleton />
  );
};

export default Article;
