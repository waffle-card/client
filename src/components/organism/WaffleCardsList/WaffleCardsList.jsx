import React, { useState } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { userState } from '@/recoils';
import { useRecoilValue } from 'recoil';
import { useWaffleCardsState } from '@/contexts';
import { useIsOverflow, useInterval } from '@/hooks';
import { WaffleCard, EmptyCard, LoginGuide, NoCardGuide } from '@/components';
import WaffleCardsWrapper from './WaffleCardsWrapper';
import { css } from '@emotion/react';

const WaffleCardsList = ({
  type,
  onClickWaffleCard,
  onClickWaffleCardCreate,
  onClickWaffleCardEdit,
  onClickWaffleCardDelete,
  onClickLikeToggle,
  onSubmit,
  ...props
}) => {
  const user = useRecoilValue(userState);
  const waffleCards = useWaffleCardsState();
  const [containerRef, isOverflow] = useIsOverflow();
  const [isPlayMove, setIsPlayMove] = useState(true);

  const handleClickWaffleCard = waffleCard => {
    onClickWaffleCard && onClickWaffleCard(waffleCard);
  };

  const handleClickWaffleCardCreate = () => {
    onClickWaffleCardCreate && onClickWaffleCardCreate();
  };

  const handleClickWaffleCardEdit = waffleCard => {
    onClickWaffleCardEdit && onClickWaffleCardEdit(waffleCard);
  };

  const handleClickWaffleCardDelete = async waffleCardId => {
    onClickWaffleCardDelete && onClickWaffleCardDelete(waffleCardId);
  };

  const handleClickLikeToggle = (waffleCardId, likeToggled) => {
    onClickLikeToggle && onClickLikeToggle(waffleCardId, likeToggled);
  };

  // 1. 카드 wrapped 원래대로 돌려놓기
  // 2. 채팅 모달 온 오프 값 가져오기
  // 4. 처음으로 가기, 끝으로 가기 버튼 구현하기

  const containerDom = containerRef.current;
  useInterval(
    () => {
      const { scrollLeft, clientWidth } = containerDom;
      const scrolledWidth = Math.ceil(scrollLeft + clientWidth);
      const isRenderedCards = scrolledWidth > containerDom.clientWidth;
      const isFinishScroll = scrolledWidth === containerDom.scrollWidth;

      isRenderedCards && isFinishScroll && setIsPlayMove(false);
      containerDom.scrollLeft += 1;
    },
    15,
    isPlayMove,
  );

  return (
    <Container
      ref={containerRef}
      isOverflow={isOverflow}
      type={type}
      {...props}
    >
      {!user && type !== 'total' ? (
        <LoginGuide />
      ) : (
        (() => {
          if (type === 'my' && waffleCards.length <= 0) {
            return <EmptyCard onClick={handleClickWaffleCardCreate} />;
          }
          if (waffleCards.length <= 0) {
            return <NoCardGuide />;
          } else {
            return (
              <WaffleCardsWrapper
                isOverflow={isOverflow}
                containerRef={containerRef?.current}
                onMouseOver={() => {
                  setIsPlayMove(false);
                }}
                onMouseOut={() => {
                  // 채팅창이 열리지 않았을 때의 조건을 걸어준다
                  setIsPlayMove(true);
                }}
              >
                {waffleCards.map((waffleCard, index) => (
                  <StyledWaffleCard
                    type={type}
                    key={waffleCard.id + index}
                    waffleCardData={waffleCard}
                    onClickWaffleCard={handleClickWaffleCard}
                    onClickLikeToggle={handleClickLikeToggle}
                    onClickEdit={handleClickWaffleCardEdit}
                    onClickDelete={handleClickWaffleCardDelete}
                  />
                ))}
              </WaffleCardsWrapper>
            );
          }
        })()
      )}
    </Container>
  );
};

const Container = styled.section`
  ${({ type }) => {
    if (type === 'my') {
      return css`
        display: flex;
        justify-content: center;
        align-items: center;
      `;
    }
  }}
  position: relative;
  padding-top: 2rem;
  margin: 4rem 0;
  overflow-x: auto;
  -ms-overflow-style: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const StyledWaffleCard = styled(WaffleCard)`
  flex: 0 0 auto;
  margin: 0 1rem;
  &:hover {
    transform: translateY(-1rem);
  }
  transition: all 250ms ease-out;
`;

WaffleCardsList.protoTypes = {
  type: PropTypes.string,
  onClickWaffleCard: PropTypes.func,
  onClickWaffleCardCreate: PropTypes.func,
  onClickWaffleCardEdit: PropTypes.func,
  onClickWaffleCardDelete: PropTypes.func,
};

WaffleCardsList.defaultProps = {
  type: 'total',
};

export default WaffleCardsList;
