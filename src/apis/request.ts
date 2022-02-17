import axios, { AxiosInstance } from 'axios';

const convertErrorResponse = (response: any) => {
  return {
    status: response.status ?? 500,
    message: response.data.message ?? '알 수 없는 에러가 발생했습니다.',
    data: response.data,
  };
};

const setInterceptors = (instance: AxiosInstance) => {
  instance.interceptors.request.use(
    config => {
      config.headers = {
        ...config.headers,
      };
      return config;
    },
    error => Promise.reject(convertErrorResponse(error.response)),
  );

  instance.interceptors.response.use(
    response => {
      return response;
    },
    error => Promise.reject(convertErrorResponse(error.response)),
  );
  return instance;
};

const setAuthInterceptors = (instance: AxiosInstance) => {
  instance.interceptors.request.use(
    config => {
      const storedToken = sessionStorage.getItem('WAFFLE_TOKEN');
      if (!storedToken) return config;
      const TOKEN = JSON.parse(storedToken);
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${TOKEN}`;
      return config;
    },
    error => Promise.reject(convertErrorResponse(error.response)),
  );

  instance.interceptors.response.use(
    response => {
      return response;
    },
    error => Promise.reject(convertErrorResponse(error.response)),
  );
  return instance;
};

const createInstance = () => {
  const instance = axios.create({
    baseURL: process.env.REACT_APP_API_END_POINT,
    timeout: 10000,
  });
  return setInterceptors(instance);
};

const createInstanceWithAuth = () => {
  const instance = axios.create({
    baseURL: process.env.REACT_APP_API_END_POINT,
    timeout: 10000,
  });
  return setAuthInterceptors(instance);
};

export const request = createInstance();

export const authRequest = createInstanceWithAuth();
