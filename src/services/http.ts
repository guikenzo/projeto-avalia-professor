import axios from 'axios';

export const baseURL = 'https://base/';

const http = axios.create({
  baseURL: `${baseURL}api/`,
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
