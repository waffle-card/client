import { request, authRequest } from './request';

const commentApi = {
  getCommentsByWaffleCardId: waffleCardId =>
    request.get('/comments', { params: { 'waffle-card-id': waffleCardId } }),
  getCommentById: id => request.get(`/comments/${id}`),
  createComment: (waffleCardId, text) =>
    authRequest.post(`/comments`, { waffleCardId, text }),
  updateComment: (id, text) => authRequest.put(`/comments/${id}`, { text }),
  deleteComment: id => authRequest.delete(`/comments/${id}`),
};

export default commentApi;
