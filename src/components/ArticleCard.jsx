import { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import axios from "../redux/settings/axios";

import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Skeleton from "@mui/material/Skeleton";
import Avatar from "@mui/material/Avatar";
import AvatarNoImg from "../components/AvatarNoImg";

import EditBlock from "./EditBlock";

import { useFormatDate } from "../hooks/useFormatDate";

import {
  fetchCategory,
  fetchRemoveArticle,
} from "../redux/filter/athyncActions";

const ArticleCard = ({ article }) => {
  const hostImgUrl = "https://bublog-back.onrender.com/";

  const articleSubText =
    article.articleText.length > 100
      ? article.articleText.slice(0, 100).concat("...")
      : article.articleText;

  const dispatch = useDispatch();
  const { isAuth, user } = useSelector((state) => state.auth);
  const { month, year, day, time } = useFormatDate(article.createdAt);

  const [isLoading, setIsLoading] = useState(true);

  const { categoryTitle, categoryId, categories } = useSelector(
    (state) => state.filter
  );

  const [commentsAmount, setCommentsAmount] = useState();

  const articlePath = categoryTitle.toLowerCase();

  const categoryName = categories.find(
    (category) => category.categoryId === article.category
  );

  const onClickRemove = async (id) => {
    await dispatch(fetchRemoveArticle(id));
    await dispatch(fetchCategory({ categoryId }));
  };

  useEffect(() => {
    const getCommentsAmount = async () => {
      await axios
        .get(`/comments/${article._id}`)
        .then((res) => {
          setCommentsAmount(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
      setIsLoading(false);
    };
    getCommentsAmount();
  }, [article._id]);
  // console.log(article);

  return !isLoading ? (
    <div className="article article_category" key={article._id}>
      <div className="article__content">
        <div className="article__top-box">
          <div className="article__box-image">
            {article.articleImgUrl && (
              <Link
                to={`/${categoryId}/${article._id}`}
                className="article__title-link"
              >
                <div className="article__image-ibg">
                  <img
                    src={`${hostImgUrl}${article.articleImgUrl}`}
                    alt="img"
                  />
                </div>
              </Link>
            )}
          </div>
          {isAuth && user._id === article.user._id ? (
            <EditBlock
              searchId={article._id}
              onClickAction={onClickRemove}
              objType={"article"}
            />
          ) : null}
          <div className="article__top-content">
            <p className="article__category-title">{categoryName.title}</p>
            <Link
              to={`/${categoryId}/${article._id}`}
              className="article__title-link"
            >
              <h2 className="article__title article__title_category">
                {article.title}
              </h2>
            </Link>
            <p className="article__text article__text_category">
              Enim omittam qui id, ex quo atqui dictas complectitur. Nec ad
              timeam accusata, hinc justo falli id eum, ferri novum molestie eos
              cu.
            </p>
            {!article.articleImgUrl && (
              <p className="article__text article__text">{articleSubText}</p>
            )}
          </div>
        </div>
        <div className="article__bottom article__bottom_category">
          <div className="article__user-info">
            {article.user.avatarUrl ? (
              <Avatar
                alt={article.user.name}
                src={`${hostImgUrl}${article.user.avatarUrl}`}
                sx={{ width: 32, height: 32 }}
              />
            ) : (
              <AvatarNoImg name={article.user.name} />
            )}
            <div className="article__user-data">
              <p className="article__author article__author_category">
                By {article.user.name}
              </p>
              <p className="article__data">{`${year} ${month} ${day}, ${time}`}</p>
            </div>
          </div>

          <div className="article__views-and-comments article__views-and-comments_category">
            <div className="article__views">
              <RemoveRedEyeIcon color="primary" />
              {article.vievCount > 0 && <span>{article.vievCount}</span>}
            </div>
            <Link
              to={`/${articlePath}/${article._id}`}
              className="article__comments"
            >
              <QuestionAnswerIcon color="primary" />
              <span>{commentsAmount ? commentsAmount : ""}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Skeleton variant="rounded" height={366} />
  );
};
export default ArticleCard;
