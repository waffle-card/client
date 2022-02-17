import { AxiosResponse } from 'axios';
import { request, authRequest } from './request';

interface CommentApiType {
  getCommentsByWaffleCardId: (waffleCardId: string) => Promise<AxiosResponse>;
  getCommentById: (id: string) => Promise<AxiosResponse>;
  createComment: (waffleCardId: string, text: string) => Promise<AxiosResponse>;
  updateComment: (id: string, text: string) => Promise<AxiosResponse>;
  deleteComment: (id: string) => Promise<AxiosResponse>;
}

const commentApi: CommentApiType = {
  getCommentsByWaffleCardId: waffleCardId =>
    request.get('/comments', { params: { 'waffle-card-id': waffleCardId } }),
  getCommentById: id => request.get(`/comments/${id}`),
  createComment: (waffleCardId, text) =>
    authRequest.post(`/comments`, { waffleCardId, text }),
  updateComment: (id, text) => authRequest.put(`/comments/${id}`, { text }),
  deleteComment: id => authRequest.delete(`/comments/${id}`),
};

export default commentApi;
