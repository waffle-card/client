import { authRequest } from './request';

const likeApi = {
  createLike: waffleCardId => authRequest.post('/likes', { waffleCardId }),
  deleteLike: waffleCardId => authRequest.delete('/likes', { waffleCardId }),
};

export default likeApi;
