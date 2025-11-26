import axios from 'axios';

export const baseURL = 'https://projeto-avalia-hh2z.onrender.com/';

const http = axios.create({
  baseURL: `${baseURL}`,
});

http.interceptors.request.use(
  config => {
    if (config.data?._parts) {
      config.headers['Content-Type'] = 'multipart/form-data';
    }

    const accessToken = sessionStorage.getItem('accessToken');
    if (accessToken) {
      config.headers!.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  error => Promise.reject(error),
);

export { http };
