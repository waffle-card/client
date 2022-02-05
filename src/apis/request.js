import axios from 'axios';

const setInterceptors = instance => {
  instance.interceptors.request.use(
    config => {
      config.headers = {
        ...config.headers,
      };
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

const setAuthInterceptors = instance => {
  instance.interceptors.request.use(
    config => {
      const TOKEN = JSON.parse(sessionStorage.getItem('WAFFLE_TOKEN'));
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

const createInstance = () => {
  const instance = axios.create({
    baseURL: process.env.API_END_POINT,
    timeout: 5000,
  });
  return setInterceptors(instance);
};

const createInstanceWithAuth = () => {
  const instance = axios.create({
    baseURL: process.env.API_END_POINT,
    timeout: 5000,
  });
  return setAuthInterceptors(instance);
};

export const request = createInstance();

export const authRequest = createInstanceWithAuth();
