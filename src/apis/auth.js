import { request, authRequest } from './request';

const userApi = {
  signup: userInfo => request.post('/auth/signup', userInfo),
  login: userInfo => request.post('/auth/login', userInfo),
  me: () => authRequest.get(`/auth/me`),
};

export default userApi;
