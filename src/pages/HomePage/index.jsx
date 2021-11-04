import React, { useCallback, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Common from '@styles';
import { Route } from 'react-router-dom';
import {
  Tab,
  Spinner,
  CardsContainer,
  CardEditModal,
  ChattingCard,
  ScrollGuide,
} from '@components';
import { cardApi } from '@apis';
import Swal from 'sweetalert2';
import { parseCardInfo } from '@utils';
import { useUser } from '@contexts';

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

const HomePage = () => {
  const [cardList, setCardList] = useState([]);
  const [currentParam, setCurrentParam] = useState('');
  const { userInfo } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  const getTodayCardList = useCallback(async () => {
    if (!userInfo) return;
    setIsLoading(true);
    try {
      const response = await cardApi.getChannelCardList();
      const cardList = response.data.map(cardData => {
        return parseCardInfo(cardData);
      });
      setCardList(cardList);
    } catch (error) {
      Swal.fire({
        title: '🥲',
        text: error,
        confirmButtonColor: Common.colors.point,
      });
    }
    setIsLoading(false);
  }, [userInfo]);

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
      const currentUrlArr = window.location.pathname.split('/');
      setCurrentParam(() => {
        return currentUrlArr[currentUrlArr.length - 1];
      });

      if (currentUrlArr.includes('today') || currentUrlArr[1] === '') {
        getTodayCardList();
      } else if (currentUrlArr.includes('my')) {
        getMyCardList(userInfo?.id);
      } else if (currentUrlArr.includes('like')) {
        getBookmarkCardList();
      }
    };
    setIsLoading(true);
    init();
    setIsLoading(false);
  }, [currentParam, getBookmarkCardList, getTodayCardList, userInfo]);

  const handleTabClick = () => {
    setCurrentParam(() => {
      const currentUrlArr = window.location.pathname.split('/');
      return currentUrlArr[currentUrlArr.length - 1];
    });
  };

  return (
    <HomeContainer>
      <nav>
        <Tab
          onClick={() => {
            handleTabClick();
          }}>
          <Tab.Item title="오늘의 카드" index="0" param="today"></Tab.Item>
          <Tab.Item title="나의 카드" index="1" param="my"></Tab.Item>
          <Tab.Item title="관심 카드" index="2" param="like"></Tab.Item>
        </Tab>
      </nav>
      <CardsContainer
        myCard={currentParam === 'my'}
        userInfo={userInfo}
        cardList={cardList}
        currentParam={currentParam}
      />
      <Route path="/cards/my/create" render={() => <CardEditModal visible />} />
      <Route
        path="/cards/my/update/:cardId"
        render={() => <CardEditModal visible editMode />}
      />
      <Route
        path="/card/detail/:Param/:cardId"
        render={() => <ChattingCard visible />}
      />
      <ScrollGuide class="scroll_guide" />
      <Spinner loading={isLoading} />
    </HomeContainer>
  );
};
export default HomePage;
