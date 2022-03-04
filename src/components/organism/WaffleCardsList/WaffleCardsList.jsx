import React, { useState } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { userState } from '@/recoils';
import { useRecoilValue } from 'recoil';
import { useWaffleCardsState } from '@/contexts';
import { useIsOverflow, useInterval } from '@/hooks';
import { WaffleCard, EmptyCard, LoginGuide, NoCardGuide } from '@/components';
import ScrollButtons from './ScrollButtons';
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
  const containerDom = containerRef.current;

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

  const handleClickFrontButton = () => {
    containerDom.scrollLeft = 0;
  };

  const handleClickBackButton = () => {
    containerDom.scrollLeft = containerDom.scrollWidth;
  };

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
    type,
  );

  return (
    <>
      <ScrollButtons
        onClickFrontButton={handleClickFrontButton}
        onClickBackButton={handleClickBackButton}
      />
      <Container
        ref={containerRef}
        isOverflow={isOverflow}
        type={type}
        {...props}
        onMouseOver={() => {
          setIsPlayMove(false);
        }}
        onMouseOut={() => {
          setIsPlayMove(true);
        }}
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
              return waffleCards?.map(waffleCard => (
                <StyledWaffleCard
                  type={type}
                  key={waffleCard.id}
                  waffleCardData={waffleCard}
                  onClickWaffleCard={handleClickWaffleCard}
                  onClickLikeToggle={handleClickLikeToggle}
                  onClickEdit={handleClickWaffleCardEdit}
                  onClickDelete={handleClickWaffleCardDelete}
                />
              ));
            }
          })()
        )}
      </Container>
    </>
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
  display: flex;
  justify-content: ${({ isOverflow }) =>
    isOverflow ? 'flex-start' : 'center'};
  align-items: center;
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
  onClickWaffleCard: PropTypes.func,
  onClickWaffleCardCreate: PropTypes.func,
  onClickWaffleCardEdit: PropTypes.func,
  onClickWaffleCardDelete: PropTypes.func,
};

WaffleCardsList.defaultProps = {
  type: 'total',
};

export default WaffleCardsList;
