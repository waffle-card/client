import { request, authRequest } from './request';

const userApi = {
  getWaffleCards: () => request.get('/waffle-cards'),
  getWaffleCardById: id => request.post(`/waffle-cards/${id}`),
  getMyWaffleCard: () => authRequest.get('/waffle-cards/my'),
  getMyLikedWaffleCards: () => authRequest.get('/waffle-cards/like'),
  createWaffleCard: waffleCardInfo =>
    authRequest.post('/waffle-cards', waffleCardInfo),
  updateWaffleCard: (waffleCardId, waffleCardInfo) =>
    authRequest.put(`/waffle-cards/${waffleCardId}`, waffleCardInfo),
  deleteWaffleCard: waffleCardId =>
    authRequest.delete(`/waffle-cards/${waffleCardId}`),
};

export default userApi;
