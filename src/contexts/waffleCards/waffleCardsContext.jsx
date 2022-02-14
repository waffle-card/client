import { createContext, useCallback, useContext, useState } from 'react';
import { waffleCardApi } from '@apis';
import { userState } from '@recoil';
import { useRecoilValue } from 'recoil';

const WaffleCardsStateContext = createContext([]);
const WaffleCardsDispatchContext = createContext(null);

export const WaffleCardsProvider = ({ children }) => {
  const [waffleCards, setWaffleCards] = useState([]);
  const user = useRecoilValue(userState);

  const setWaffleCardsByType = useCallback(
    async type => {
      console.log('setWaffleCardsByType - 시작');

      if (!user && type !== 'total') {
        setWaffleCards([]);
        return;
      }

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

      try {
        const { data: waffleCards } = await waffleCardsCommand[type]();
        setWaffleCards(waffleCards);
      } catch (error) {
        console.error(`in WaffleCards Recoil: ${error.message}`);
        return [];
      }

      console.log('setWaffleCardsByType - 끝');
    },
    [user],
  );

  return (
    <WaffleCardsStateContext.Provider value={waffleCards}>
      <WaffleCardsDispatchContext.Provider value={setWaffleCardsByType}>
        {children}
      </WaffleCardsDispatchContext.Provider>
    </WaffleCardsStateContext.Provider>
  );
};

export const useWaffleCardsState = () => useContext(WaffleCardsStateContext);
export const useWaffleCardsDispatch = () =>
  useContext(WaffleCardsDispatchContext);
