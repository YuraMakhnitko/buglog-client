import { useState, useRef, useEffect } from "react";

import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import { IoIosArrowDown } from "react-icons/io";

const SelectCategory = ({ categorySelected, setCategorySelected }) => {
  const categoryRef = useRef();

  const [popup, setPopup] = useState(false);

  const [categoriesList, setCategoriesList] = useState([]);
  const categories = useSelector((state) => state.filter.categories);

  useEffect(() => {
    const filteredCategories = categories.filter((item) => {
      return item.categoryId !== 0 && item.categoryId !== 1;
    });
    setCategoriesList(filteredCategories);
  }, [categories]);

  const popupOpen = `add-article__categories-box_on`;

  const handleSetCategory = (category) => {
    setCategorySelected(category);
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
      className="add-article__categories"
      ref={categoryRef}
      onClick={useClickOutside(categoryRef)}
    >
      <Button onClick={setPopupState} size="small" variant="outlined">
        {" "}
        <p className="header__category-title-name">{categorySelected}</p>
        <IoIosArrowDown className="header__category-arrow" />
      </Button>
      {/* <p className="add-article__category" onClick={setPopupState}>
        {categorySelected}
      </p> */}
      <div className={`add-article__categories-box ${popup ? popupOpen : ""}`}>
        {categoriesList.map((category) => (
          <button
            key={category.categoryId}
            className="add-article__category-type"
            onClick={() => handleSetCategory(category)}
          >
            {category.title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SelectCategory;
