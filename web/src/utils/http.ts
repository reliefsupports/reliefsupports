import axios from 'axios';
import localStorage from './localStorage';
import { userSessionKey } from 'config';

// @todo: Update proper axios type definitions
const requestInterceptor = (req: any) => {
  const user = localStorage.getParsed(userSessionKey);
  const { accessToken } = user || {};
  if (accessToken) {
    req.headers.Authorization = `Bearer ${accessToken}`;
    setAuthHeader(accessToken);
  }

  return req;
};

const responseInterceptor = (res: any) => {
  return res.data?.message;
};

export const init = () => {
  axios.defaults.baseURL = '/api';
  axios.interceptors.request.use(requestInterceptor);
  axios.interceptors.response.use(responseInterceptor);
};

export const setAuthHeader = (token: string) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const resetAuthHeader = () => {
  axios.defaults.headers.common.Authorization = false;
};

export const create = (args: any) => axios.create(args);

export const all = (iterable: any) =>
  axios.all(iterable).then(axios.spread((...args) => args));

export const request = (options: any) => axios(options);

export const get = (url: any, options = {}) => axios.get(url, options);

export const post = (url: any, data: any, options = {}) =>
  axios.post(url, data, options);

export const put = (url: string, data: any, options = {}) =>
  axios.put(url, data, options);

export const patch = (url: string, data: any, options = {}) =>
  axios.patch(url, data, options);

export const del = (url: string) => axios.delete(url);
