import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { useScreenSize } from "../hooks/useScreenSize";

import { Button } from "@mui/material";
import { IoIosArrowDown } from "react-icons/io";

import {
  setCategory,
  setCategoryId,
  setIsLoading,
} from "../redux/filter/slice";

const Categories = ({ hidden }) => {
  const visibleStyle = hidden
    ? "header__categories_hidden"
    : "header__categories";

  const dispatch = useDispatch();

  const categoryRef = useRef();
  const screenSize = useScreenSize();

  const [popup, setPopup] = useState(false);
  const categories = useSelector((state) => state.filter.categories);

  const categoryTitle = useSelector((state) => state.filter.categoryTitle);
  console.log(categoryTitle);

  const popupOpen = `header__categories-box_on`;

  const handleSetCategory = async (title, categoryId) => {
    dispatch(setCategory(title));
    dispatch(setCategoryId(categoryId));
    dispatch(setIsLoading(true));
    setPopup(false);
  };

  const setPopupState = () => {
    setPopup(!popup);
  };

  const useClickOutside = (ref) => {
    useEffect(() => {
      if (popup) {
        const listener = (e) => {
          if (!ref.current || ref.current.contains(e.target)) {
            return;
          }
          setPopup(false);
        };
        document.addEventListener("click", listener);
        return () => document.removeEventListener("click", listener);
      }
    }, [ref, popup]);
  };

  return (
    <div
      className={visibleStyle}
      ref={categoryRef}
      onClick={useClickOutside(categoryRef)}
    >
      {screenSize.width > 767.98 ? (
        <Button onClick={setPopupState} size="small">
          {" "}
          <p className="header__category-title-name">{categoryTitle}</p>
          <IoIosArrowDown className="header__category-arrow" />
        </Button>
      ) : (
        <div className="header__button" onClick={setPopupState}>
          <p className="posts__title">{categoryTitle}</p>
          <IoIosArrowDown className="header__category-arrow_mobile" />
        </div>
      )}
      <div className={`header__categories-box ${popup ? popupOpen : ""}`}>
        {categories.map((category) => (
          <Link
            to={`/${category.categoryId}`}
            key={category.categoryId}
            className="header__category-link"
          >
            <button
              className="header__category-type"
              onClick={() =>
                handleSetCategory(category.title, category.categoryId)
              }
            >
              {category.title}
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
