import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useDebounce } from "use-debounce";

import { Button } from "@mui/material";
import { BsSearch } from "react-icons/bs";
import { FiDelete } from "react-icons/fi";
import { ImBlogger } from "react-icons/im";
import Avatar from "@mui/material/Avatar";

import AvatarNoImg from "./AvatarNoImg";

import { setLogOut } from "../redux/auth/slice";
import { setCategory } from "../redux/filter/slice";
import { fetchSearchValue, fetchCategory } from "../redux/filter/athyncActions";

import Categories from "./Categories";

import UserMenu from "./UserMenu";
import { useScreenSize } from "../hooks/useScreenSize";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const screenSize = useScreenSize();
  const { user, isAuth } = useSelector((state) => state.auth);
  const [inputValue, setInputValue] = useState("");

  const searchValue = useDebounce(inputValue, 150)[0];

  const handelSearchValie = (e) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    if (searchValue) {
      dispatch(fetchSearchValue(searchValue));
    } else {
      dispatch(setCategory("Latest"));
      dispatch(fetchCategory({ categoryId: 1 }));
    }
  }, [searchValue]);

  const handleClearInput = () => {
    setInputValue("");
  };

  const logOutHandler = () => {
    dispatch(setLogOut());
    navigate("/");
  };

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__content">
          <div className="header__logo">
            <Link to="/" className="header__logo-link">
              <ImBlogger className="header__logo-icon" />
            </Link>
            {screenSize.width > 520 && (
              <Link to="/" className="header__logo-link">
                UBLOG
              </Link>
            )}
            {/* <Link to="/" className="header__logo-link">
              UBLOG
            </Link> */}
          </div>
          <div className="header__nav-header">
            {/* <Link to="/" className="header__link header__link_dn">
              Home
            </Link> */}
            {screenSize.width > 767.98 && <Categories />}
            {/* <Categories /> */}

            <div className="header__auth">
              <div className="header__search">
                <input
                  type="text"
                  value={inputValue}
                  className="header__input"
                  onChange={handelSearchValie}
                />
                {inputValue ? (
                  <FiDelete
                    className="header__delete-icon"
                    onClick={handleClearInput}
                  />
                ) : (
                  <BsSearch className="header__search-icon" />
                )}
              </div>
              <div className="header__block-buttons">
                {isAuth ? (
                  user.avatarUrl ? (
                    <Link to="/account">
                      <Avatar
                        alt={user.name ? user.name : ""}
                        src={user.avatarUrl ? user.avatarUrl : ""}
                        sx={{ width: 32, height: 32 }}
                      />
                    </Link>
                  ) : (
                    <Link to="/account">
                      <AvatarNoImg name={user.name} />
                    </Link>
                  )
                ) : (
                  <Link to="/auth/register">
                    <Button
                      variant="contained"
                      size="small"
                      className="header__button"
                    >
                      Sing Up
                    </Button>
                  </Link>
                )}
                {isAuth ? (
                  <UserMenu />
                ) : (
                  <Link to="/auth/login">
                    <Button
                      onClick={logOutHandler}
                      variant="outlined"
                      size="small"
                      className="header__button"
                    >
                      Login
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
