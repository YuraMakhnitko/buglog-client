import axios from 'axios';

// const instance = axios.create({ baseURL: 'https://bublog-back.onrender.com/' });
const instance = axios.create({ baseURL: 'https://bublog-back.onrender.com/' });
// const instance = axios.create({
//   baseURL: 'https://glowing-sunflower-09cd1a.netlify.app/',
// });

instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem('token');
  return config;
});

export default instance;
