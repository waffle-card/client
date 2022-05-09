import { AxiosResponse } from 'axios';
import { authRequest } from './request';
import { LikeType } from '@/types';

interface LikeApiType {
  createLike: (waffleCardId: string) => Promise<AxiosResponse<LikeType>>;
  deleteLike: (waffleCardId: string) => Promise<AxiosResponse>;
}

const likeApi: LikeApiType = {
  createLike: waffleCardId => authRequest.post('/likes', { waffleCardId }),
  deleteLike: waffleCardId =>
    authRequest.delete(`/likes`, { data: { waffleCardId } }),
};

export default likeApi;
