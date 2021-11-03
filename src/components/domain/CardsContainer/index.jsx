import React from 'react';
import styled from '@emotion/styled';
import Common from '@styles';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { EmptyCard, WaffleCard, Text, Button } from '@components';

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

const CardsContainer = ({ myCard, cardList, userInfo, currentParam }) => {
  const history = useHistory();

  if (!userInfo && (currentParam === 'my' || currentParam === 'bookmark')) {
    return (
      <Container>
        <Text size={24}>와플카드 대화에 참여해보세요!</Text>
        <Button
          width={250}
          onClick={() => {
            history.push('/login');
          }}>
          로그인하러 가기
        </Button>
      </Container>
    );
  }

  return (
    <Container>
      {/* <Icons backgroundColor={'rgba(0, 0, 0, 0)'}>
        <Icons.ArrowBack color={Common.colors.primary} fontSize={'30px'} />
      </Icons> */}
      {cardList.length === 0 ? (
        myCard ? (
          <EmptyCard />
        ) : (
          <Text>등록된 카드가 없습니다</Text>
        )
      ) : (
        cardList.map(card => {
          return (
            <StyledCard
              myCard={myCard}
              key={card.id}
              cardData={{
                id: card.id,
                emoji: card.emoji,
                cardColor: card.cardColor,
                hashTags: card.hashTags,
              }}
              onClickCard={() => {
                history.push({
                  pathname: `/card/detail/${
                    currentParam ? currentParam : 'today'
                  }/${card.id}`,
                  state: {
                    cardData: card,
                    userId: userInfo ? userInfo.id : '',
                  },
                });
              }}
            />
          );
        })
      )}
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
