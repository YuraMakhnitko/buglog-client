import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";

import axios from "../../redux/settings/axios";

import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useFormatDate } from "../../hooks/useFormatDate";

const Slide = ({ slide }) => {
  const [commentsAmount, setCommentsAmount] = useState();
  const { month, year, day, time } = useFormatDate(slide.createdAt);

  const { categoryTitle, categoryId, categories } = useSelector(
    (state) => state.filter
  );
  const categoryName = categories.find(
    (category) => category.categoryId === slide.category
  );

  const articleSubText =
    slide.articleText.length > 150
      ? slide.articleText.slice(0, 150).concat("...")
      : slide.articleText;

  useEffect(() => {
    const getCommentsAmount = async () => {
      axios
        .get(`/comments/${slide._id}`)
        .then((res) => {
          setCommentsAmount(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getCommentsAmount();
  }, []);

  return (
    <div key={slide._id}>
      <div className="article">
        <div className="article__box-image">
          <div className="article__image-ibg">
            <Link
              to={`/${slide.category}/${slide._id}`}
              className="article__title-link"
            >
              <img src={slide.articleImgUrl} alt="img" />
            </Link>
          </div>
        </div>
        <div className="article__content article__content_slide">
          <div className="article__content-box">
            <p className="article__category-title">{categoryName.title}</p>
            <Link
              to={`/${slide.category}/${slide._id}`}
              className="article__title-link"
            >
              <h2 className="article__title">{slide.title}</h2>
            </Link>
            <p className="article__text">{articleSubText}</p>
            <div className="article__user-info">
              <img
                src={slide.user.avatarUrl}
                alt="avatar"
                className="comments__avatar"
              />
              <div className="article__user-data">
                <p className="article__author article__author_category">
                  By {slide.user.name}
                </p>
                <p className="article__data">{`${year} ${month} ${day}, ${time}`}</p>
              </div>
            </div>

            <div className="article__bottom article__bottom_slide">
              <p className="article__data">{slide.dateCreation}</p>
              <div className="article__views-and-comments article__views-and-comments_slide">
                <div className="article__views">
                  <RemoveRedEyeIcon color="primary" />

                  <span>{slide.vievCount ? slide.vievCount : ""}</span>
                </div>
                <Link
                  to={`/${slide.category}/${slide._id}`}
                  className="article__comments"
                >
                  <QuestionAnswerIcon color="primary" />
                  <span>{commentsAmount ? commentsAmount : ""}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slide;
