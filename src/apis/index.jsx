import axios from 'axios';
import { useSessionStorage } from '@hooks';

const API_END_POINT = 'http://13.209.30.200';
const TEAM_ID = '616a204c22996f0bc94f6e17';

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
const instance = createInstance();

const createInstanceWithAuth = options => {
  const instance = axios.create({ baseURL: API_END_POINT, ...options });
  return setInterceptors(instance, true);
};
const auth = createInstanceWithAuth();

const authApi = {
  getAuthUser: () => auth.get('/auth-user'),
  signUp: userInfo => instance.post('/signup', userInfo),
  login: userInfo => instance.post('/login', userInfo),
  logout: () => instance.post('/logout'),
};

const userApi = {
  getUserInfo: userId => instance.get(`users/${userId}`),
  putUserName: userName => auth.put('settings/update-user', userName),
  putUserPassword: userPassword =>
    auth.put('settings/update-password', userPassword),
};

const postApi = {
  getUserPostList: (userId, params) =>
    instance.get(`posts/author/${userId}`, { params }),
  getChannelPostList: (channelId, params) =>
    instance.get(`posts/channel/${channelId}`, { params }),
  createPost: post => auth.post('posts/create', post),
  readPost: postId => instance.post(`posts/${postId}`),
  updatePost: post => auth.put('posts/update', post),
  deletePost: postId => auth.delete('posts/delete', postId),
  createPostLike: postId => auth.post('likes/create', postId),
  deletePostLike: postId => auth.delete('likes/delete', postId),
  createPostComment: commentInfo => auth.post('comments/create', commentInfo),
  deletePostComment: commentId => auth.delete('comments/delete', commentId),
};

export { authApi, userApi, postApi };
