import React from 'react';
import styled from '@emotion/styled';
import Common from '@styles';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Icons, EmptyCard, WaffleCard, EmptyContainer } from '@components';

const Container = styled.section`
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  min-height: 413px;
  margin-top: 112px;
  overflow-x: scroll;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
  @media ${Common.media.sm} {
    margin-top: 64px;
  }
  @media ${Common.media.md} {
    margin-top: 88px;
  }
`;

const StyledCard = styled(WaffleCard)`
  flex: 0 0 auto;
  margin: 0 10px;
`;

const CardsContainer = ({ cards, currentParam, userInfo }) => {
  const history = useHistory();

  if (currentParam === 'today' && cards.length === 0) {
    return <EmptyContainer />;
  }

  if (currentParam === 'my') {
    if (!userInfo) {
      return <EmptyContainer notLogin />;
    }
    if (cards.length === 0)
      return (
        <Container>
          <EmptyCard />
        </Container>
      );
  }

  if (currentParam === 'bookmark') {
    if (!userInfo) {
      return <EmptyContainer notLogin />;
    }
    if (cards.length === 0)
      return <EmptyContainer> 즐겨찾기한 카드가 없습니다!</EmptyContainer>;
  }

  return (
    <Container>
      {/* <Icons backgroundColor={'rgba(0, 0, 0, 0)'}>
        <Icons.ArrowBack color={Common.colors.primary} fontSize={'30px'} />
      </Icons> */}
      {[...cards.slice(0, 6)].map(card => {
        const { cardColor, hashTags } = JSON.parse(card.meta);
        return (
          <StyledCard
            key={card._id}
            cardData={{
              id: card._id,
              emoji: card.title,
              cardColor: cardColor,
              hashTags: hashTags,
            }}
            onClickCard={() => {
              history.push({
                pathname: `/card/detail/${
                  currentParam ? currentParam : 'today'
                }/${card._id}`,
                state: { cardData: card, userId: userInfo ? userInfo.id : '' },
              });
            }}
          />
        );
      })}
      {/* <Icons backgroundColor={'rgba(0, 0, 0, 0)'}>
        <Icons.ArrowFront color={Common.colors.primary} fontSize={'30px'} />
      </Icons> */}
    </Container>
  );
};

CardsContainer.protoTypes = {
  cards: PropTypes.array.isRequired,
  currentParam: PropTypes.string.isRequired,
};

export default CardsContainer;
