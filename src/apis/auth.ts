import { AxiosResponse } from 'axios';
import { request, authRequest } from './request';

interface UserApiType {
  signup: (userInfo: {
    name: string;
    email: string;
    password: string;
  }) => Promise<AxiosResponse>;
  login: (userInfo: {
    email: string;
    password: string;
  }) => Promise<AxiosResponse>;
  me: () => Promise<AxiosResponse>;
  updateUser: ({
    name,
    password,
  }: {
    name: string;
    password: string;
  }) => Promise<AxiosResponse>;
}

const userApi: UserApiType = {
  signup: userInfo => request.post('/auth/signup', userInfo),
  login: userInfo => request.post('/auth/login', userInfo),
  me: () => authRequest.get(`/auth/me`),
  updateUser: ({ name, password }) =>
    authRequest.put('/auth/update', { name, password }),
};

export default userApi;
