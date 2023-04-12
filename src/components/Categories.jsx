import { useState, useRef, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import {
  setCategory,
  setCategoryId,
  setIsLoading,
} from "../redux/filter/slice";
import { fetchCategory } from "../redux/filter/athyncActions";

const Categories = ({ hidden }) => {
  const visibleStyle = hidden
    ? "header__categories_hidden"
    : "header__categories";

  const { categoryId } = useParams();

  const dispatch = useDispatch();

  const categoryRef = useRef();

  const [popup, setPopup] = useState(false);
  const categories = useSelector((state) => state.filter.categories);
  const articles = useSelector((state) => state.filter.articles);
  const isLoading = useSelector((state) => state.filter.isLoading);
  // console.log(categories[0].title);

  const categoryTitle = useSelector((state) => state.filter.categoryTitle);

  const popupOpen = `header__categories-box_on`;

  const handleSetCategory = async (title, categoryId) => {
    dispatch(setCategory(title));
    dispatch(setCategoryId(categoryId));
    dispatch(setIsLoading(true));
    setPopup(false);
  };

  // useEffect(() => {
  //   if (categoryId) {
  //     const findCategory = categories.find(
  //       (obj) => obj.categoryId === Number(categoryId)
  //     );
  //     dispatch(setCategory(findCategory.title));
  //     dispatch(fetchCategory({ categoryId }));
  //     // dispatch(setIsLoading(false));
  //     // console.log(categoryId);
  //     return;
  //   }
  // }, [categoryId]);

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
      <p className="header__category" onClick={setPopupState}>
        {categoryTitle}
      </p>
      <div className={`header__categories-box ${popup ? popupOpen : ""}`}>
        {categories.map((category) => (
          <Link to={`/${category.categoryId}`} key={category.categoryId}>
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
