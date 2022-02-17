import { selectorFamily } from 'recoil';
import { waffleCardApi } from '@/apis';
import { userState } from './user';

// TODO(윤호): 와플카드 전역 상태 Recoil로 변경시도, 하지만 캐시기능 떄문에 리프레쉬의 어려움이 있어서 Context로 대체

const waffleCardsCommand = {
  total: () => {
    return waffleCardApi.getWaffleCards();
  },
  my: () => {
    return waffleCardApi.getMyWaffleCard();
  },
  like: () => {
    return waffleCardApi.getMyLikedWaffleCards();
  },
};

export const waffleCardsState = selectorFamily({
  key: 'waffleCards/get',
  get:
    type =>
    async ({ get }) => {
      const user = get(userState);

      if (!user && type !== 'total') return [];

      try {
        const { data: waffleCards } = await waffleCardsCommand[type]();
        return waffleCards;
      } catch (error) {
        console.error(`in WaffleCards Recoil: ${error.message}`);
        return [];
      }
    },
});
