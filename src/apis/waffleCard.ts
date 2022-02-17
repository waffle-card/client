import { AxiosResponse } from 'axios';
import { request, authRequest } from './request';
import { WaffleCardType } from '@/types';

interface WaffleCardApiType {
  getWaffleCards: () => Promise<AxiosResponse>;
  getWaffleCardById: (id: Pick<WaffleCardType, 'id'>) => Promise<AxiosResponse>;
  getMyWaffleCard: () => Promise<AxiosResponse>;
  getMyLikedWaffleCards: () => Promise<AxiosResponse>;
  createWaffleCard: ({
    emoji,
    color,
    hashTags,
  }: Pick<
    WaffleCardType,
    'emoji' | 'color' | 'hashTags'
  >) => Promise<AxiosResponse>;
  updateWaffleCard: (
    waffleCardId: string,
    {
      emoji,
      color,
      hashTags,
    }: Pick<WaffleCardType, 'emoji' | 'color' | 'hashTags'>,
  ) => Promise<AxiosResponse>;
  deleteWaffleCard: (
    waffleCardId: Pick<WaffleCardType, 'id'>,
  ) => Promise<AxiosResponse>;
}

const waffleCardApi: WaffleCardApiType = {
  getWaffleCards: () => request.get('/waffle-cards'),
  getWaffleCardById: id => request.post(`/waffle-cards/${id}`),
  getMyWaffleCard: () => authRequest.get('/waffle-cards/my'),
  getMyLikedWaffleCards: () => authRequest.get('/waffle-cards/like'),
  createWaffleCard: ({ emoji, color, hashTags }) =>
    authRequest.post('/waffle-cards', { emoji, color, hashTags }),
  updateWaffleCard: (waffleCardId, { emoji, color, hashTags }) =>
    authRequest.put(`/waffle-cards/${waffleCardId}`, {
      emoji,
      color,
      hashTags,
    }),
  deleteWaffleCard: waffleCardId =>
    authRequest.delete(`/waffle-cards/${waffleCardId}`),
};

export default waffleCardApi;
