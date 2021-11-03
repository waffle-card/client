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
} from '@components';
import { authApi, cardApi } from '@apis';
import { getUserInfoByToken } from '@utils';
import Swal from 'sweetalert2';

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

const parseCardInfo = cardData => {
  const {
    cardColor = '',
    hashTags = [],
    bookmarkCount = 0,
    likeCount = 0,
  } = JSON.parse(cardData.meta);
  return {
    id: cardData._id,
    author: cardData.author.fullName,
    emoji: cardData.title,
    cardColor,
    hashTags,
    createdAt: cardData.createdAt,
    updatedAt: cardData.updatedAt,
    bookmarkCount,
    likeCount,
    comments: cardData.comments,
  };
};

const sleep = () => {
  return new Promise(resolve => {
    setTimeout(() => resolve(), 2000);
  });
};

const HomePage = () => {
  const [cardList, setCardList] = useState([]);
  const [currentParam, setCurrentParam] = useState('');
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const getTodayCardList = async () => {
    setIsLoading(true);
    try {
      const response = await cardApi.getChannelCardList();
      const cardList = response.data.slice(0, 10).map(cardData => {
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
  };

  const getMyCardList = async () => {
    setIsLoading(true);
    try {
      const response = await cardApi.getUserCardList(userInfo.id);
      const cardList = response.data.slice(0, 1).map(cardData => {
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
  };

  // const getBookmarkCardList = async () => {
  //   try {
  //     setIsLoading(true);
  //     const response = await cardApi.getUserBookMarkCardList();
  //     console.log(response);
  //     // setCardList(res.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   setIsLoading(false);
  // };

  useEffect(() => {
    const init = async () => {
      const userInfo = await getUserInfoByToken();
      setUserInfo(userInfo);

      const currentUrlArr = window.location.pathname.split('/');
      setCurrentParam(() => {
        return currentUrlArr[currentUrlArr.length - 1];
      });

      if (currentParam.includes('today') || currentParam[1] === '') {
        console.log('it is today');
        getTodayCardList();
      } else if (currentParam.includes('my')) {
        console.log('it is my');
        getMyCardList();
      } else if (currentParam.includes('bookmark')) {
        // TODO: 즐겨찾기 테스트
      }
    };
    init();
  }, [currentParam]);

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
      {/* <CardsContainer /> */}
      <Route path="/card/create" render={() => <CardEditModal visible />} />
      <Route
        path="/card/update:cardId"
        render={() => <CardEditModal visible />}
      />
      <Route
        path="/card/detail/:Param/:cardId"
        render={() => <ChattingCard visible />}
      />
      <Spinner loading={isLoading} />
    </HomeContainer>
  );
};
export default HomePage;
