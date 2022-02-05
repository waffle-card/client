import axios from 'axios';

const API_END_POINT = 'https://waffle-card.herokuapp.com';

const convertErrorResponse = response => {
  return {
    status: response.status ?? 500,
    message: response.data.message ?? 'FE: 알 수 없는 에러가 발생했습니다.',
    data: response.data,
  };
};

const setInterceptors = instance => {
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

const setAuthInterceptors = instance => {
  instance.interceptors.request.use(
    config => {
      const TOKEN = JSON.parse(sessionStorage.getItem('WAFFLE_TOKEN'));
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
    baseURL: API_END_POINT,
    timeout: 5000,
  });
  return setInterceptors(instance);
};

const createInstanceWithAuth = () => {
  const instance = axios.create({
    baseURL: API_END_POINT,
    timeout: 5000,
  });
  return setAuthInterceptors(instance);
};

export const request = createInstance();

export const authRequest = createInstanceWithAuth();
