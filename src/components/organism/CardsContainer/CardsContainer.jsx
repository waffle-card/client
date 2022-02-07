import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import Common from '@styles';
import { WaffleCard, Card } from '@components';
import LoginGuide from './LoginGuide';
import NoCardGuide from './NoCardGuide';
import { useUser } from '@contexts';

const CardsContainer = ({ type = 'total', waffleCardsData, ...props }) => {
  const { userInfo } = useUser();

  const handleEmptyCard = () => {
    console.log('클릭!');
  };

  switch (type) {
    case 'total':
      if (waffleCardsData.length <= 0) {
        return (
          <EmptyContainer>
            <NoCardGuide />
          </EmptyContainer>
        );
      }
      return (
        <CardListContainer {...props}>
          {waffleCardsData.map(waffleCard => (
            <BasicWaffleCard key={waffleCard.id} waffleCardData={waffleCard} />
          ))}
        </CardListContainer>
      );
    case 'my':
      if (!userInfo) {
        return (
          <EmptyContainer>
            <LoginGuide />
          </EmptyContainer>
        );
      }
      if (waffleCardsData.length <= 0) {
        return (
          <EmptyContainer>
            <Card.Empty onClick={handleEmptyCard} />
          </EmptyContainer>
        );
      }
      return (
        <CardListContainer {...props}>
          {waffleCardsData.map(waffleCard => (
            <MyWaffleCard key={waffleCard.id} waffleCardData={waffleCard} />
          ))}
        </CardListContainer>
      );
    case 'like':
      if (!userInfo) {
        return (
          <EmptyContainer>
            <LoginGuide />
          </EmptyContainer>
        );
      }
      if (waffleCardsData.length <= 0) {
        return (
          <EmptyContainer>
            <NoCardGuide />
          </EmptyContainer>
        );
      }
      return (
        <CardListContainer {...props}>
          {waffleCardsData.map(waffleCard => (
            <BasicWaffleCard key={waffleCard.id} waffleCardData={waffleCard} />
          ))}
        </CardListContainer>
      );

    default:
      return null;
  }
};

const CardListContainer = styled.section`
  position: relative;
  display: flex;
  align-items: center;
  height: 500px;
  padding: 35px 0;
  margin-top: 5vh;
  overflow-x: scroll;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
  @media ${Common.media.sm} {
    padding: 20px 0;
    min-height: 300px;
    justify-content: center;
  }
`;

const EmptyContainer = styled.section`
  position: relative;
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  height: 500px;
  padding: 35px 0;
  margin-top: 5vh;
  overflow-x: scroll;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const BasicWaffleCard = styled(WaffleCard.Basic)`
  flex: 0 0 auto;
  margin: 0 10px;
  &:hover {
    transform: translateY(-18px);
  }
  transition: all 250ms ease-out;
`;

const MyWaffleCard = styled(WaffleCard.Edit)`
  flex: 0 0 auto;
  margin: 0 10px;
  &:hover {
    transform: translateY(-18px);
  }
  transition: all 250ms ease-out;
`;

CardsContainer.protoTypes = {
  type: PropTypes.string,
  waffleCardsData: PropTypes.array.isRequired,
};

CardsContainer.defaultProps = {
  type: 'total',
};

export default CardsContainer;
