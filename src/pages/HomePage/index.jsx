import React, { useCallback, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Common from '@styles';
import { Tab, Spinner, CardsContainer, ScrollGuide } from '@components';
import { Outlet } from 'react-router-dom';
import { cardApi } from '@apis';
import Swal from 'sweetalert2';
import { parseCardInfo } from '@utils';
import { useUser } from '@contexts';

const HomePage = () => {
  const { userInfo } = useUser();
  const [cardList, setCardList] = useState([]);
  const [cardListName, setCardListName] = useState('total');
  const [isLoading, setIsLoading] = useState(false);

  const getTodayCardList = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await cardApi.getChannelCardList();
      const waffleCards = response.data.map(waffleCard => {
        return parseCardInfo(waffleCard);
      });
      setCardList(waffleCards);
    } catch (error) {
      Swal.fire({
        title: '🥲',
        text: error,
        confirmButtonColor: Common.colors.point,
      });
    }
    setIsLoading(false);
  }, []);

  const getMyCardList = async userId => {
    setIsLoading(true);
    try {
      if (userId) {
        const response = await cardApi.getUserCardList(userId);
        const cardList = response.data.map(cardData => {
          return parseCardInfo(cardData);
        });
        setCardList(cardList);
      } else {
        setCardList([]);
      }
    } catch (error) {
      Swal.fire({
        title: '🥲',
        text: error,
        confirmButtonColor: Common.colors.point,
      });
    }
    setIsLoading(false);
  };

  const getBookmarkCardList = useCallback(async () => {
    if (!userInfo) return;
    try {
      setIsLoading(true);
      const response = await cardApi.getChannelCardList();
      const CardDataList = response.data.filter(card => {
        return card.likes.find(like => like.user === userInfo.id)
          ? true
          : false;
      });
      const favoriteCardList = CardDataList.map(cardData => {
        return parseCardInfo(cardData);
      });
      setCardList(favoriteCardList);
    } catch (error) {
      Swal.fire({
        title: '🥲',
        text: error,
        confirmButtonColor: Common.colors.point,
      });
    }
    setIsLoading(false);
  }, [userInfo]);

  useEffect(() => {
    const init = async () => {
      if (cardListName === 'total') {
        await getTodayCardList();
        return;
      }
      if (cardListName === 'my') {
        await getMyCardList(userInfo?.id);
        return;
      }
      if (cardListName === 'like') {
        await getBookmarkCardList();
        return;
      }
    };
    setIsLoading(true);
    init();
    setIsLoading(false);
    // eslint-disable-next-line
  }, [cardListName]);

  const handleTabClick = name => {
    setCardListName(name);
  };

  return (
    <HomeContainer>
      <Tab onClick={handleTabClick} currentActive={cardListName} />
      <CardsContainer
        myCard={cardListName === 'my'}
        userInfo={userInfo}
        cardList={cardList}
        currentParam={cardListName}
      />
      <ScrollGuide class="scroll_guide" />
      <Spinner loading={isLoading} />
      <Outlet />
    </HomeContainer>
  );
};

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  padding: 10px 50px;
  @media ${Common.media.sm} {
    padding: 10px 16px;
  }
  height: calc(100vh - 60px);
  margin: 0 auto;
`;

export default HomePage;
