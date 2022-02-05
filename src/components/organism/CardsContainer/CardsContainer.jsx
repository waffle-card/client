import React from 'react';
import styled from '@emotion/styled';
import Common from '@styles';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Card, WaffleCard, Text, Button } from '@components';

const CardsContainer = ({ myCard, cardList, userInfo, currentParam }) => {
  const navigate = useNavigate();

  if (!userInfo && (currentParam === 'my' || currentParam === 'like')) {
    return (
      <EmptyContainer userInfo={userInfo}>
        <GuideWrap>
          <StyledText size={24}>와플카드 대화에 참여해보세요!</StyledText>
          <StyledButton
            width={250}
            onClick={() => {
              navigate('/login');
            }}>
            로그인하러 가기
          </StyledButton>
        </GuideWrap>
      </EmptyContainer>
    );
  }

  return (
    <Container cardCount={cardList.length} currentParam={currentParam}>
      {/* <Icons backgroundColor={'rgba(0, 0, 0, 0)'}>
        <Icons.ArrowBack color={Common.colors.primary} fontSize={'30px'} />
      </Icons> */}
      {cardList.length === 0 ? (
        myCard ? (
          <Card.Empty fontSize={'16px'} />
        ) : (
          <GuideWrap>
            <StyledText>
              {currentParam === 'like'
                ? '좋아하는 카드가 없습니다'
                : '등록된 카드가 없습니다'}
            </StyledText>
          </GuideWrap>
        )
      ) : (
        cardList.map(card => {
          return (
            <BasicWaffleCard
              myCard={myCard}
              key={card.id}
              waffleCard={card}
              // onClickCard={() => {
              //   history.push({
              //     pathname: `/card/detail/${
              //       currentParam ? currentParam : 'today'
              //     }/${card.id}`,
              //     state: {
              //       cardData: card,
              //       userId: userInfo ? userInfo.id : '',
              //     },
              //   });
              // }}
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
    justify-content: ${({ currentParam }) =>
      currentParam === 'my' ? 'center' : 'flex-start'};
  }
`;

const EmptyContainer = styled.section`
  position: relative;
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  min-height: 413px;
  padding: 35px 0;
  margin-top: 5vh;
  overflow-x: scroll;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const GuideWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  @media ${Common.media.sm} {
    height: calc(180px * 1.56);
  }
  @media ${Common.media.md} {
    height: calc(216px * 1.56);
  }
  @media ${Common.media.lg} {
    height: calc(265px * 1.56);
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

const StyledText = styled(Text)`
  margin-bottom: 56px;
  @media ${Common.media.sm} {
    margin-bottom: 40px;
    font-size: ${Common.fontSize.medium};
  }
`;
const StyledButton = styled(Button)`
  font-weight: ${Common.fontWeight.bold};
  @media ${Common.media.sm} {
    width: 180px;
    height: 40px;
    font-size: ${Common.fontSize.small};
  }
`;

CardsContainer.protoTypes = {
  cards: PropTypes.array.isRequired,
  currentParam: PropTypes.string.isRequired,
};

export default CardsContainer;
