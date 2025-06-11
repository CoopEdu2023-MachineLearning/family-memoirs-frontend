import axios from 'axios';
import config from '../config';
import requestInterceptor from './requestInterceptor';
import responseInterceptor from './responseInterceptor';

const baseURL = config.baseUrl;

const http = axios.create({
  baseURL: baseURL,
});

export const getArticleById = (id) => {
  return http.get(`/article/${id}`);
};

requestInterceptor(http);
responseInterceptor(http);

export default http;