import { createContext, useCallback, useContext, useState } from 'react';
import { waffleCardApi } from '@/apis';
import { userState } from '@/recoils';
import { useRecoilValue } from 'recoil';

const cachedWaffleCards = {
  total: null,
  my: null,
  like: null,
};

const WaffleCardsStateContext = createContext([]);
const WaffleCardsDispatchContext = createContext(null);

export const WaffleCardsProvider = ({ children }) => {
  const [waffleCards, setWaffleCards] = useState([]);
  const user = useRecoilValue(userState);

  const setWaffleCardsByType = useCallback(
    async (type, options) => {
      if (!user && type !== 'total') {
        setWaffleCards(() => []);
        return;
      }

      if (options?.cached && cachedWaffleCards[type]) {
        setWaffleCards(() => cachedWaffleCards[type]);
        return;
      }

      const waffleCardsCommand = {
        total: async () => {
          const { data: waffleCards } = await waffleCardApi.getWaffleCards();
          return waffleCards;
        },
        my: async () => {
          if (cachedWaffleCards.total) {
            return cachedWaffleCards.total.filter(
              waffleCard => waffleCard.user.id === user.id,
            );
          }

          const { data: waffleCards } = await waffleCardApi.getMyWaffleCard();
          return waffleCards;
        },
        like: async () => {
          if (cachedWaffleCards.total) {
            return cachedWaffleCards.total.filter(waffleCard =>
              waffleCard.likeUserIds.includes(user.id),
            );
          }

          const { data: waffleCards } =
            await waffleCardApi.getMyLikedWaffleCards();
          return waffleCards;
        },
      };

      try {
        const waffleCards = await waffleCardsCommand[type]();

        cachedWaffleCards[type] = [...waffleCards];

        setWaffleCards(() => [...waffleCards]);
      } catch (error) {
        console.error(`in WaffleCards Recoil: ${error.message}`);
        return [];
      }
    },
    [user],
  );

  const refreshWaffleCards = async (type = 'total') => {
    Object.keys(cachedWaffleCards).forEach(async type => {
      cachedWaffleCards[type] = null;
    });

    await setWaffleCardsByType(type);
  };

  return (
    <WaffleCardsStateContext.Provider value={waffleCards}>
      <WaffleCardsDispatchContext.Provider
        value={{
          setWaffleCardsByType,
          refreshWaffleCards,
        }}
      >
        {children}
      </WaffleCardsDispatchContext.Provider>
    </WaffleCardsStateContext.Provider>
  );
};

export const useWaffleCardsState = () => useContext(WaffleCardsStateContext);
export const useWaffleCardsDispatch = () =>
  useContext(WaffleCardsDispatchContext);
