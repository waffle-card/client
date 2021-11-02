import axios from 'axios';
import { useSessionStorage } from '@hooks';

const API_END_POINT = 'http://13.209.30.200';
const CHANNEL_ID = '616a204c22996f0bc94f6e17';

const setInterceptors = (instance, auth) => {
  auth &&
    instance.interceptors.request.use(
      config => {
        const TOKEN = JSON.parse(useSessionStorage('WAFFLE_TOKEN'));
        config.headers.Authorization = `bearer ${TOKEN}`;
        return config;
      },
      error => {
        return Promise.reject(error.response);
      },
    );

  instance.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      return Promise.reject(error.response);
    },
  );
  return instance;
};

const createInstance = options => {
  const instance = axios.create({ baseURL: API_END_POINT, ...options });
  return setInterceptors(instance);
};
const request = createInstance();

const createInstanceWithAuth = options => {
  const instance = axios.create({ baseURL: API_END_POINT, ...options });
  return setInterceptors(instance, true);
};
const authRequest = createInstanceWithAuth();

const authApi = {
  getAuthUser: () => authRequest.get('/auth-user'),
  signUp: userInfo => request.post('/signup', userInfo),
  login: userInfo => request.post('/login', userInfo),
  logout: () => request.post('/logout'),
};

const userApi = {
  getUserInfo: userId => request.get(`users/${userId}`),
  putUserName: userName =>
    authRequest.put('settings/update-user', { username: userName }),
  putUserPassword: password =>
    authRequest.put('settings/update-password', { password }),
};

const cardApi = {
  getUserCardList: (userId, params) =>
    request.get(`posts/author/${userId}`, { params }),
  getUserBookMarkCardList: userId => {}, // TODO:  API 확인 후 리팩토링
  getChannelCardList: params =>
    request.get(`posts/channel/${CHANNEL_ID}`, { params }),
  createCard: post =>
    authRequest.post('posts/create', { ...post, channelId: CHANNEL_ID }),
  getCard: postId => request.post(`posts/${postId}`),
  updateCard: post => authRequest.put('posts/update', post),
  deleteCard: postId => authRequest.delete('posts/delete', postId),
  createCardLike: postId => authRequest.post('likes/create', postId),
  deleteCardLike: postId => authRequest.delete('likes/delete', postId),
  createCardBookMark: postId => {}, // TODO:  API 확인 후 리팩토링
  deleteCardBookMark: postId => {}, // TODO:  API 확인 후 리팩토링
  getCardComment: commentId => {}, // TODO:  API 확인 후 리팩토링
  createCardComment: commentInfo =>
    authRequest.post('comments/create', commentInfo),
  deleteCardComment: commentId =>
    authRequest.delete('comments/delete', commentId),
};

export { authApi, userApi, cardApi, request, authRequest };
