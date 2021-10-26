import axios from 'axios';

const API_END_POINT = 'http://13.209.30.200';

// 지은 1팀 ID
const TEAM_ID = '616a204c22996f0bc94f6e17';

export const GetAPI = async (url, params = {}) => {
  try {
    const result = axios.get(`${API_END_POINT}${url}`, params);

    return result;
  } catch (error) {
    console.error(error);
    return;
  }
};

export const PostAPI = async (url, params = {}) => {
  try {
    const result = axios.post(`${API_END_POINT}${url}`, params);

    return result;
  } catch (error) {
    console.error(error);
    return;
  }
};

export const PutAPI = async (url, params = {}) => {
  try {
    const result = axios.put(`${API_END_POINT}${url}`, params);

    return result;
  } catch (error) {
    console.error(error);
    return;
  }
};

export const DeleteAPI = async (url, params = {}) => {
  try {
    const result = axios.post(`${API_END_POINT}${url}`, params);

    return result;
  } catch (error) {
    console.error(error);
    return;
  }
};
