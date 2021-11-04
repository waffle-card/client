import axios from 'axios';

const API_END_POINT = 'http://13.209.30.200';
const CHANNEL_ID = '616a204c22996f0bc94f6e17';
// const CHANNEL_ID = '6182ac3fe1ecd063dabf10d0'; // new

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
  getUserBookMarkCardList: userId => {}, // TODO:  API 확인 후 리팩토링
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
      }),
    );
    authRequest.post('posts/create', cardFormData);
  },
  getCard: cardId => request.get(`posts/${cardId}`),
  updateCard: ({ cardId, emoji, cardColor, hashTags }) => {
    const cardFormData = new FormData();
    cardFormData.append('postId', cardId);
    cardFormData.append('title', emoji);
    cardFormData.append('image', null);
    cardFormData.append('channelId', CHANNEL_ID);
    cardFormData.append(
      'meta',
      JSON.stringify({
        cardColor,
        hashTags,
      }),
    );
    authRequest.put('posts/update', cardFormData);
  },
  deleteCard: cardId =>
    authRequest.delete('posts/delete', { data: { id: cardId } }),
  // createCardLike: postId => authRequest.post('likes/create', postId),
  // deleteCardLike: postId => authRequest.delete('likes/delete', postId),
  addLikeCard: async (userId, cardId) => {
    try {
      const userInfoResponse = await userApi.getUserInfo(userId);
      console.log('여기', userInfoResponse.meta);
      const { likeCardList = [], bookmarkCardList = [] } = JSON.parse(
        userInfoResponse.data.meta,
      );
      if (!likeCardList.includes(cardId)) {
        likeCardList.push(cardId);
      }

      const userInfo = {
        fullName: userInfoResponse.data.fullName,
        username: userInfoResponse.data.fullName,
        meta: JSON.stringify({ likeCardList, bookmarkCardList }),
      };
      console.log(userInfo);
      authRequest.put('settings/update-user', userInfo);

      const cardInfoResponse = await cardApi.getCard(cardId);
      const {
        title: emoji,
        cardColor,
        hashTags = [],
        likeUsers = [],
        bookmarkUsers = [],
      } = cardInfoResponse.data;
      const cardFormData = new FormData();
      cardFormData.append('postId', cardId);
      cardFormData.append('title', emoji);
      cardFormData.append('image', null);
      cardFormData.append('channelId', CHANNEL_ID);
      cardFormData.append(
        'meta',
        JSON.stringify({
          cardColor,
          hashTags,
          likeUsers: likeUsers.push(userId),
          bookmarkUsers: bookmarkUsers,
        }),
      );
      authRequest.put('posts/update', cardFormData);
    } catch (e) {
      console.log(e);
    }
  },
  deleteLikeCard: async (userId, cardId) => {
    try {
      const response = await userApi.getUserInfo(userId);
      const { likeCardList = [], bookmarkCardList = [] } = JSON.parse(
        response.data.meta,
      );
      if (likeCardList.includes(cardId)) {
        likeCardList.splice(likeCardList.indexOf(cardId), 1);
      }

      const userInfo = {
        fullName: response.data.fullName,
        username: response.data.fullName,
        meta: JSON.stringify({ likeCardList, bookmarkCardList }),
      };
      console.log(userInfo);
      authRequest.put('settings/update-user', userInfo);

      const cardInfoResponse = await cardApi.getCard(cardId);
      const {
        title: emoji,
        cardColor,
        hashTags = [],
        likeUsers = [],
        bookmarkUsers = [],
      } = cardInfoResponse.data;
      const cardFormData = new FormData();
      cardFormData.append('postId', cardId);
      cardFormData.append('title', emoji);
      cardFormData.append('image', null);
      cardFormData.append('channelId', CHANNEL_ID);
      cardFormData.append(
        'meta',
        JSON.stringify({
          cardColor,
          hashTags,
          likeUsers: likeUsers.filter(id => id !== userId),
          bookmarkUsers: bookmarkUsers,
        }),
      );
      authRequest.put('posts/update', cardFormData);
    } catch (error) {
      console.log(error);
    }
  },
  addBookmarkCard: async (userId, cardId) => {
    try {
      const userInfoResponse = await userApi.getUserInfo(userId);
      const { likeCardList = [], bookmarkCardList = [] } = JSON.parse(
        userInfoResponse.data.meta,
      );
      if (!bookmarkCardList.includes(cardId)) {
        bookmarkCardList.push(cardId);
      }

      const userInfo = {
        fullName: userInfoResponse.data.fullName,
        username: userInfoResponse.data.fullName,
        meta: JSON.stringify({ likeCardList, bookmarkCardList }),
      };
      console.log(userInfo);
      authRequest.put('settings/update-user', userInfo);

      const cardInfoResponse = await cardApi.getCard(cardId);
      const {
        title: emoji,
        cardColor,
        hashTags = [],
        likeUsers = [],
        bookmarkUsers = [],
      } = cardInfoResponse.data;
      const cardFormData = new FormData();
      cardFormData.append('postId', cardId);
      cardFormData.append('title', emoji);
      cardFormData.append('image', null);
      cardFormData.append('channelId', CHANNEL_ID);
      cardFormData.append(
        'meta',
        JSON.stringify({
          cardColor,
          hashTags,
          likeUsers: likeUsers,
          bookmarkUsers: bookmarkUsers.push(userId),
        }),
      );
      authRequest.put('posts/update', cardFormData);
    } catch (error) {
      console.log(error);
    }
  },
  deleteBookmarkCard: async (userId, cardId) => {
    try {
      const response = await userApi.getUserInfo(userId);
      const { likeCardList = [], bookmarkCardList = [] } = JSON.parse(
        response.data.meta,
      );
      if (bookmarkCardList.includes(cardId)) {
        bookmarkCardList.splice(bookmarkCardList.indexOf(cardId), 1);
      }

      const userInfo = {
        fullName: response.data.fullName,
        username: response.data.fullName,
        meta: JSON.stringify({ likeCardList, bookmarkCardList }),
      };
      console.log(userInfo);
      authRequest.put('settings/update-user', userInfo);

      const cardInfoResponse = await cardApi.getCard(cardId);
      const {
        title: emoji,
        cardColor,
        hashTags = [],
        likeUsers = [],
        bookmarkUsers = [],
      } = cardInfoResponse.data;
      const cardFormData = new FormData();
      cardFormData.append('postId', cardId);
      cardFormData.append('title', emoji);
      cardFormData.append('image', null);
      cardFormData.append('channelId', CHANNEL_ID);
      cardFormData.append(
        'meta',
        JSON.stringify({
          cardColor,
          hashTags,
          likeUsers: likeUsers,
          bookmarkUsers: bookmarkUsers.filter(id => id !== userId),
        }),
      );
      authRequest.put('posts/update', cardFormData);
    } catch (error) {
      console.log(error);
    }
  },
  createCardComment: commentInfo =>
    authRequest.post('comments/create', commentInfo),
  updateCardComment: commentInfo =>
    authRequest.put('comments/update', commentInfo),
  deleteCardComment: commentId =>
    authRequest.delete('comments/delete', commentId),
};

export { authApi, userApi, cardApi, request, authRequest };
