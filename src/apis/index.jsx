import axios from 'axios';

const API_END_POINT = 'http://13.209.30.200';
const CHANNEL_ID = '6182ac3fe1ecd063dabf10d0';

const setInterceptors = (instance, auth) => {
  auth &&
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
  initUserInfo: (userInfo, token) =>
    axios({
      url: `${API_END_POINT}/settings/update-user`,
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` },
      data: {
        username: userInfo.userName,
        fullName: userInfo.userName,
        meta: JSON.stringify({
          likeCardList: userInfo.likeCardList ? userInfo.likeCardList : [],
          bookmarkCardList: userInfo.bookmarkCardList
            ? userInfo.bookmarkCardList
            : [],
        }),
      },
    }),
  putUserName: userName =>
    authRequest.put('settings/update-user', {
      username: userName,
      fullName: userName,
    }),
  putUserPassword: password =>
    authRequest.put('settings/update-password', { password }),
};

const cardApi = {
  getUserCardList: (userId, params) =>
    request.get(`posts/author/${userId}`, { params }),
  getChannelCardList: params =>
    request.get(`posts/channel/${CHANNEL_ID}`, { params }),
  createCard: ({ emoji, cardColor, hashTags }) => {
    const cardFormData = new FormData();
    cardFormData.append('title', emoji);
    cardFormData.append('image', null);
    cardFormData.append('channelId', CHANNEL_ID);
    cardFormData.append(
      'meta',
      JSON.stringify({
        cardColor,
        hashTags,
        bookmarkUsers: [],
        likeUsers: [],
      }),
    );
    authRequest.post('posts/create', cardFormData);
  },
  getCard: cardId => request.get(`posts/${cardId}`),
  updateCard: cardInfo => {
    const { cardColor, hashTags, likeUsers, bookmarkUsers } = cardInfo;
    const cardFormData = new FormData();
    cardFormData.append('postId', cardInfo.id);
    cardFormData.append('title', cardInfo.emoji);
    cardFormData.append('image', null);
    cardFormData.append('channelId', CHANNEL_ID);
    cardFormData.append(
      'meta',
      JSON.stringify({
        cardColor,
        hashTags,
        likeUsers,
        bookmarkUsers,
      }),
    );
    authRequest.put('posts/update', cardFormData);
  },
  deleteCard: cardId =>
    authRequest.delete('posts/delete', { data: { id: cardId } }),
  createCardLike: cardId =>
    authRequest.post('likes/create', { postId: cardId }),
  deleteCardLike: likeId =>
    authRequest.delete('likes/delete', { data: { id: likeId } }),
  createCardComment: commentInfo =>
    authRequest.post('comments/create', commentInfo),
  updateCardComment: commentInfo =>
    authRequest.put('comments/update', commentInfo),
  deleteCardComment: commentId =>
    authRequest.delete('comments/delete', commentId),
};

export { authApi, userApi, cardApi, request, authRequest };
