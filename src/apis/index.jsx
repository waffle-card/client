import axios from 'axios';
import { useSessionStorage } from '@hooks';

const API_END_POINT = 'http://13.209.30.200';
const CHANNEL_ID = '616a204c22996f0bc94f6e17';

const setInterceptors = (instance, auth) => {
  auth &&
    instance.interceptors.request.use(
      config => {
        const TOKEN = JSON.parse(useSessionStorage('authUser'));
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

const postApi = {
  getUserPostList: (userId, params) =>
    request.get(`posts/author/${userId}`, { params }),
  getUserFavoritePostList: userId => {}, // TODO:  API 확인 후 리팩토링
  getChannelPostList: params =>
    request.get(`posts/channel/${CHANNEL_ID}`, { params }),
  createPost: post =>
    authRequest.post('posts/create', { ...post, channelId: CHANNEL_ID }),
  getPost: postId => request.post(`posts/${postId}`),
  updatePost: post => authRequest.put('posts/update', post),
  deletePost: postId => authRequest.delete('posts/delete', postId),
  createPostLike: postId => authRequest.post('likes/create', postId),
  deletePostLike: postId => authRequest.delete('likes/delete', postId),
  createPostFavorite: postId => {}, // TODO:  API 확인 후 리팩토링
  deletePostFavorite: postId => {}, // TODO:  API 확인 후 리팩토링
  getPostComment: commentId => {}, // TODO:  API 확인 후 리팩토링
  createPostComment: commentInfo =>
    authRequest.post('comments/create', commentInfo),
  deletePostComment: commentId =>
    authRequest.delete('comments/delete', commentId),
};

export { authApi, userApi, postApi, request, authRequest };
