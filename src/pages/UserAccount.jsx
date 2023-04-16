import React, { useEffect, useRef, useState } from 'react';

import LibreFranklin from '../scss/common.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useForm } from 'react-hook-form';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Divider from '@mui/material/Divider';
import axios from '../redux/settings/axios';

import AvatarNoImg from '../components/AvatarNoImg';
import { fetchAuthMe } from '../redux/auth/athyncActions';

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme({
  typography: {
    fontFamily: 'Libre Franklin, Arial',
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': [LibreFranklin],
      },
    },
  },
});

const UserAccount = () => {
  const hostAvatarUrl = 'https://bublog-back.onrender.com/';
  const hostUrl = 'src';

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [avatarUrl, setAvatarUrl] = useState('');
  const [dataImgUrl, setDataImgUrl] = useState('');
  const [imgType, setImgType] = useState('');
  const { user, isAuth } = useSelector((state) => state.auth);
  const inputFileRef = useRef(null);
  console.log(dataImgUrl, 'dataImgUrl');

  const { handleSubmit } = useForm();

  console.log(avatarUrl, 'avatarUrl');

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      setImgType(file.type);
      formData.append('image', file);
      const { data } = await axios.post(
        `/upload/avatars/${user._id}`,
        formData
      );
      setAvatarUrl(`${hostUrl}${data.url}`);
      setDataImgUrl(data.url);
    } catch (error) {
      console.warn(error);
      alert('Error when uploading file');
    }
  };

  const onSubmit = async () => {
    const fields = {
      avatarUrl: `${avatarUrl}`,
      imgAvatarUrl: `${avatarUrl}`,
      imgType: imgType,
    };
    const data = await axios.patch(`/account/${user._id}`, fields);
    dispatch(fetchAuthMe());

    navigate('/');
  };

  useEffect(() => {
    if (!isAuth) {
      navigate('/auth/login');
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
          }}
        >
          {isAuth && user.avatarUrl ? (
            <Avatar
              alt={isAuth ? user.name : ''}
              src={
                avatarUrl
                  ? `${hostAvatarUrl}${avatarUrl}`
                  : `${hostAvatarUrl}${user.avatarUrl}`
              }
              sx={{ width: 120, height: 120 }}
            />
          ) : (
            <AvatarNoImg name={isAuth ? user.name : ''} />
          )}

          <Typography component="h1" variant="h5">
            User Account
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{ mt: 3 }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Typography component="h1" variant="h6">
                  User name:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography component="h1" variant="h5">
                  {isAuth ? user.name : 'Unregistered'}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <Typography component="h1" variant="h6">
                  Email:
                </Typography>
                <Typography component="h1" variant="h5">
                  {isAuth ? user.email : 'Unregistered'}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={9}>
                <Typography component="h1" variant="h6">
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    onClick={() => inputFileRef.current.click()}
                    size="large"
                  >
                    <input
                      hidden
                      accept="image/*"
                      type="file"
                      ref={inputFileRef}
                      onChange={handleChangeFile}
                    />
                    <PhotoCamera sx={{ width: 32, height: 32 }} />
                  </IconButton>
                  + Avatar
                </Typography>
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
            <Grid container justifyContent="flex-end"></Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
};

export default UserAccount;
