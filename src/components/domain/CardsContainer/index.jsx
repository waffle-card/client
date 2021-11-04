import React from 'react';
import styled from '@emotion/styled';
import Common from '@styles';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { EmptyCard, WaffleCard, Text, Button } from '@components';
// import ScrollHorizontal from 'react-scroll-horizontal';

const Container = styled.section`
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
  @media ${Common.media.sm} {
    padding: 20px 0;
    min-height: 300px;
  }
  @media ${Common.media.md} {
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

const StyledCard = styled(WaffleCard)`
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

const CardsContainer = ({ myCard, cardList, userInfo, currentParam }) => {
  const history = useHistory();

  if (!userInfo && (currentParam === 'my' || currentParam === 'like')) {
    return (
      <Container>
        <GuideWrap>
          <StyledText size={24}>와플카드 대화에 참여해보세요!</StyledText>
          <StyledButton
            width={250}
            onClick={() => {
              history.push('/login');
            }}>
            로그인하러 가기
          </StyledButton>
        </GuideWrap>
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
          <EmptyCard fontSize={'16px'} />
        ) : (
          <GuideWrap>
            <StyledText>
              {currentParam === 'like'
                ? '좋아요 한 카드가 없습니다'
                : '등록된 카드가 없습니다'}
            </StyledText>
          </GuideWrap>
        )
      ) : (
        cardList.map(card => {
          return (
            <StyledCard
              myCard={myCard}
              key={card.id}
              cardData={card}
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
