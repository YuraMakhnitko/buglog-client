import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { styled, alpha } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';

import { Button } from '@mui/material';
import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import MoreIcon from '@mui/icons-material/MoreVert';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import { HiOutlineDocumentAdd } from 'react-icons/hi';
import { BiLogOut, BiLogIn, BiRegistered } from 'react-icons/bi';

import { setLogOut } from '../redux/auth/slice';
import { useDispatch } from 'react-redux';
import { useScreenSize } from '../hooks/useScreenSize';

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light'
        ? 'rgb(55, 65, 81)'
        : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      fontFamily: 'Libre Franklin',
      fontSize: 14,
      '& .MuiSvgIcon-root': {
        fontSize: 24,
        color: '#1976d2',
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

const UserMenu = () => {
  const dispatch = useDispatch();
  const screenSize = useScreenSize();
  const navigate = useNavigate();
  const { user, isAuth } = useSelector((state) => state.auth);
  const moreButtonStyle = isAuth ? 'more-icon' : '';

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logOutHandler = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      dispatch(setLogOut());
      handleClose();
      window.localStorage.removeItem('token');
    }
  };

  const onClickNavigate = () => {
    navigate(`/addarticle`);
  };

  return screenSize.width < 767.98 ? (
    <div>
      <IconButton
        size="large"
        aria-label="display more actions"
        edge="end"
        // color="inherit"
        color="primary"
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="contained"
        onClick={handleClick}
        className={moreButtonStyle}
      >
        <MoreIcon />
      </IconButton>
      <StyledMenu
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {isAuth ? (
          <Link to="/addarticle">
            <MenuItem onClick={handleClose} disableRipple>
              <HiOutlineDocumentAdd className="MuiSvgIcon-root" />
              Add Article
            </MenuItem>
          </Link>
        ) : (
          <Link to="/auth/register">
            <MenuItem onClick={handleClose} disableRipple>
              <BiRegistered className="MuiSvgIcon-root" />
              Sing Up!
            </MenuItem>
          </Link>
        )}

        <Divider sx={{ my: 0.5 }} />
        {isAuth ? (
          <MenuItem onClick={logOutHandler} disableRipple>
            <BiLogOut className="MuiSvgIcon-root" />
            LOGOUT
          </MenuItem>
        ) : (
          <Link to="/auth/login">
            <MenuItem onClick={handleClose} disableRipple>
              {/* <BiLogOut className="MuiSvgIcon-root" /> */}
              <BiLogIn className="MuiSvgIcon-root" />
              Login
            </MenuItem>
          </Link>
        )}
      </StyledMenu>
    </div>
  ) : (
    <>
      <Button
        onClick={onClickNavigate}
        variant="contained"
        size="small"
        className="header__button"
      >
        Add Article
      </Button>

      <Button
        onClick={logOutHandler}
        variant="outlined"
        size="small"
        className="header__button"
      >
        Logout
      </Button>
    </>
  );
};

export default UserMenu;
