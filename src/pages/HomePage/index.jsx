import React, { useEffect, useState } from 'react';
import Common from '@styles';
import styled from '@emotion/styled';
import { waffleCardApi } from '@apis';
import {
  Tab,
  Spinner,
  CardsContainer,
  ScrollGuide,
  CardEditModal,
  ChattingCard,
} from '@components';

const HomePage = () => {
  const [tabValue, setTabValue] = useState('total');
  const [isLoading, setIsLoading] = useState(false);
  const [waffleCards, setWaffleCards] = useState([]);
  const [currentWaffleCard, setCurrentWaffleCard] = useState(null);
  const [commentsData, setCommentsData] = useState(null);
  const [visibleCardEditModal, setVisibleCardEditModal] = useState(false);
  // const [visibleChattingCard, setVisibleChattingCard] = useState(false);

  const handleClickWaffleCard = async waffleCardId => {
    try {
      const response = await waffleCardApi.getWaffleCardById(waffleCardId);
      const waffleCard = response.data;
      console.log(waffleCard);
      setCurrentWaffleCard(waffleCard);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    setIsLoading(true);

    const initWaffleCards = async () => {
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
        const response = await waffleCardsCommand[tabValue]();
        const waffleCards = response.data;

        setWaffleCards(() => waffleCards);
      } catch (error) {
        console.error(error.message);
        setWaffleCards(() => []);
      }
    };

    initWaffleCards();

    setIsLoading(false);
  }, [tabValue]);

  useEffect(() => {
    console.log('로딩', isLoading);
  }, [isLoading]);

  return (
    <HomeContainer>
      <Tab onClick={setTabValue} />
      <CardsContainer
        type={tabValue}
        waffleCardsData={waffleCards}
        onClickWaffleCard={handleClickWaffleCard}
      />
      <ScrollGuide class="scroll_guide" />
      <Spinner loading={isLoading} />
      <CardEditModal
        visible={visibleCardEditModal}
        onClose={() => setVisibleCardEditModal(false)}
      />
      {/* <ChattingCard
        visible={visibleChattingCard}
        waffleCardData={currentWaffleCard}
        userData={userInfo}
        commentsData={dummyComments}
        onClose={() => setVisibleChattingCard(false)}
        onClickLikeToggle={handleClickLikeToggle}
        onSubmitComment={handleSubmitComment}
        onClickEditComment={handleClickEditComment}
        onClickDeleteComment={handleClickDeleteComment}
      /> */}
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
