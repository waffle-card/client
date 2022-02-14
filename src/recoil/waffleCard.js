import { selectorFamily } from 'recoil';
import { waffleCardApi } from '@apis';
import { userState } from './user';

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
