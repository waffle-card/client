import { request, authRequest } from './request';

const waffleCardApi = {
  getWaffleCards: () => request.get('/waffle-cards'),
  getWaffleCardById: id => request.post(`/waffle-cards/${id}`),
  getMyWaffleCard: () => authRequest.get('/waffle-cards/my'),
  getMyLikedWaffleCards: () => authRequest.get('/waffle-cards/like'),
  createWaffleCard: ({ emoji, color, hashTags }) =>
    authRequest.post('/waffle-cards', { emoji, color, hashTags }),
  updateWaffleCard: (waffleCardId, { emoji, color, hashtags }) =>
    authRequest.put(`/waffle-cards/${waffleCardId}`, {
      emoji,
      color,
      hashtags,
    }),
  deleteWaffleCard: waffleCardId =>
    authRequest.delete(`/waffle-cards/${waffleCardId}`),
};

export default waffleCardApi;
