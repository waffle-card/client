import { createContext, useCallback, useContext, useState } from 'react';
import { waffleCardApi } from '@/apis';
import { userState } from '@/recoils';
import { useRecoilValue } from 'recoil';
import { WaffleCardType } from '@/types';

const cachedWaffleCards: { [type: string]: WaffleCardType[] | null } = {
  total: null,
  my: null,
  like: null,
};

const WaffleCardsStateContext = createContext<WaffleCardType[] | null>([]);
const WaffleCardsDispatchContext = createContext<{
  setWaffleCardsByType: (type: string, waffleCards: WaffleCardType[]) => void;
  refreshWaffleCards: (type?: string) => void;
}>({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setWaffleCardsByType: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  refreshWaffleCards: () => {},
});

interface WaffleCardsProviderProps {
  children: React.ReactElement | React.ReactElement[];
}

export const WaffleCardsProvider = ({ children }: WaffleCardsProviderProps) => {
  const [waffleCards, setWaffleCards] = useState<WaffleCardType[] | null>([]);
  const user = useRecoilValue(userState);

  const setWaffleCardsByType = useCallback(
    async (type, options = {}) => {
      if (!user && type !== 'total') {
        setWaffleCards(() => []);
        return;
      }

      if (options?.cached && cachedWaffleCards[type]) {
        setWaffleCards(() => cachedWaffleCards[type]);
        return;
      }

      const waffleCardsCommand: {
        [command: string]: () => Promise<WaffleCardType[]>;
      } = {
        total: async () => {
          const { data: waffleCards } = await waffleCardApi.getWaffleCards();
          return waffleCards;
        },
        my: async () => {
          if (cachedWaffleCards.total && user) {
            return cachedWaffleCards.total.filter(
              waffleCard => waffleCard.user.id === user.id,
            );
          }

          const { data: waffleCards } = await waffleCardApi.getMyWaffleCard();
          return waffleCards;
        },
        like: async () => {
          if (cachedWaffleCards.total && user) {
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
      } catch (error: any) {
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
