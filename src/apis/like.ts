import { AxiosResponse } from 'axios';
import { authRequest } from './request';

interface LikeApiType {
  createLike: (waffleCardId: string) => Promise<AxiosResponse>;
  deleteLike: (waffleCardId: string) => Promise<AxiosResponse>;
}

const likeApi: LikeApiType = {
  createLike: waffleCardId => authRequest.post('/likes', { waffleCardId }),
  deleteLike: waffleCardId =>
    authRequest.delete(`/likes`, { data: { waffleCardId } }),
};

export default likeApi;
