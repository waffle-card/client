import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Common from '@styles';
import { Route } from 'react-router-dom';
import { Tab, CardsContainer, CardEditModal, ChattingCard } from '@components';
import { authApi, cardApi } from '@apis';

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
  const [todaycards, setTodayCards] = useState([]);
  const [myCard, setMyCard] = useState([]);
  const [bookmarkCards, setbookmarkCards] = useState([]);
  const [currentParam, setCurrentParam] = useState('');
  const [userInfo, setUserInfo] = useState({});
  const [isloading, setIsLoading] = useState(false);

  const getUserInfo = async () => {
    setIsLoading(true);
    const response = await authApi.getAuthUser();
    if (!response.data) {
      setUserInfo(false);
      setIsLoading(true);
      return;
    }
    const userInfo = {
      id: response.data._id,
      userName: response.data.fullName,
      email: response.data.email,
    };
    setUserInfo(userInfo);
    setIsLoading(false);
    return;
  };

  const getTodayCardsData = async () => {
    try {
      setIsLoading(true);
      await cardApi.getChannelCardList().then(res => {
        setTodayCards(res.data);
      });
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const getMyCardData = async () => {
    try {
      setIsLoading(true);
      await cardApi.getUserCardList().then(res => {
        setMyCard(res.data);
      });
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const getbookmarkCardsData = async () => {
    try {
      setIsLoading(true);
      await cardApi.getUserBookMarkCardList().then(res => {
        setbookmarkCards(res.data);
      });
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const currentUrlArr = window.location.pathname.split('/');
    setCurrentParam(() => {
      return currentUrlArr[currentUrlArr.length - 1];
    });

    getUserInfo();

    if (currentUrlArr.includes('today') || currentUrlArr[0] === '') {
      getTodayCardsData();
    } else if (currentUrlArr.includes('my')) {
      getMyCardData();
    } else if (currentUrlArr.includes('bookmark')) {
      // getbookmarkCardsData();
    }
  }, [currentParam, userInfo]);

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
          <Tab.Item title="즐겨찾기" index="2" param="bookmark"></Tab.Item>
        </Tab>
      </nav>
      <CardsContainer
        currentParam={currentParam}
        userInfo={userInfo}
        cards={
          currentParam === 'my'
            ? myCard
            : currentParam === 'bookmark'
            ? bookmarkCards
            : todaycards
        }
      />
      <Route path="/card/create" render={() => <CardEditModal visible />} />
      <Route
        path="/card/update:cardId"
        render={() => <CardEditModal visible />}
      />
      <Route
        path="/card/detail/:Param/:cardId"
        render={() => <ChattingCard visible />}
      />
    </HomeContainer>
  );
};
export default HomePage;
