import React from 'react';
import styled from '@emotion/styled';
import Common from '@styles';
import PropTypes from 'prop-types';
import { Card, WaffleCard } from '@components';

const CardsContainer = ({ type = 'total', waffleCardsData, ...props }) => {
  console.log(waffleCardsData);
  return (
    <Container {...props}>
      {waffleCardsData.map((waffleCard, index) => (
        <BasicWaffleCard key={index} waffleCardData={waffleCard} />
      ))}
    </Container>
  );
};

const Container = styled.section`
  position: relative;
  display: flex;
  flex-wrap: nowrap;
  justify-content: ${({ cardCount }) =>
    cardCount <= 4 ? 'center' : 'flex-start'};
  align-items: center;
  min-height: 413px;
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

const BasicWaffleCard = styled(WaffleCard.Basic)`
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
