import { AxiosResponse } from 'axios';
import { request, authRequest } from './request';
import { CommentType } from '@/types';

interface CommentApiType {
  getCommentsByWaffleCardId: (
    waffleCardId: string,
  ) => Promise<AxiosResponse<CommentType[]>>;
  getCommentById: (id: string) => Promise<AxiosResponse<CommentType>>;
  createComment: (
    waffleCardId: string,
    text: string,
  ) => Promise<AxiosResponse<CommentType>>;
  updateComment: (
    id: string,
    text: string,
  ) => Promise<AxiosResponse<CommentType>>;
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
