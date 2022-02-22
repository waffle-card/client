import React, { useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import Common from '@/styles';
import { keyframes } from '@emotion/react';
import PropTypes from 'prop-types';
import { userState } from '@/recoils';
import { useRecoilValue } from 'recoil';
import { useWaffleCardsState } from '@/contexts';
import { useIsOverflow } from '@/hooks';
import { css } from '@emotion/react';
import { WaffleCard, EmptyCard, LoginGuide, NoCardGuide } from '@/components';

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
  const maxLength = waffleCards.length * 3;
  const CardsWrapperRef = useRef(null);

  const handleClickWaffleCard = waffleCard => {
    onClickWaffleCard && onClickWaffleCard(waffleCard);
    CardsWrapperRef.current.style.animationPlayState = 'paused';
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

  const { current } = containerRef;
  useEffect(() => {
    if (current) {
      setTimeout(() => {
        containerRef.current.scrollLeft =
          CardsWrapperRef.current.offsetWidth / 3;
      }, 1000);
    }
  }, [containerRef, current]);

  return (
    <Container ref={containerRef} type={type} {...props}>
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
              <CardsWrapper
                isOverflow={isOverflow}
                maxLength={maxLength}
                ref={CardsWrapperRef}
              >
                {[...waffleCards, ...waffleCards, ...waffleCards]?.map(
                  (waffleCard, index) => (
                    <StyledWaffleCard
                      index={index}
                      type={type}
                      key={waffleCard.id + index}
                      waffleCardData={waffleCard}
                      onClickWaffleCard={handleClickWaffleCard}
                      onClickLikeToggle={handleClickLikeToggle}
                      onClickEdit={handleClickWaffleCardEdit}
                      onClickDelete={handleClickWaffleCardDelete}
                    />
                  ),
                )}
              </CardsWrapper>
            );
          }
        })()
      )}
    </Container>
  );
};

const translate = keyframes`
 0% {
  transform:translateX(-33.3333%)
  }
  100% {
    transform:translateX(-66.6666%)
  }
`;

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

const CardsWrapper = styled.ul`
  display: flex;
  align-items: center;

  width: ${({ maxLength }) => (265 + 32) * maxLength}px;
  @media ${Common.media.md} {
    width: ${({ maxLength }) => (216 + 32) * maxLength}px;
  }
  @media ${Common.media.sm} {
    width: ${({ maxLength }) => (180 + 32) * maxLength}px;
  }

  ${({ isOverflow, maxLength }) => {
    if (isOverflow) {
      return css`
        justify-content: left;
        animation-name: ${translate};
        animation-duration: ${maxLength / 0.8}s;
        animation-delay: 1s;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
        animation-direction: normal;
        &:hover {
          animation-play-state: paused;
        }
      `;
    } else {
      return css`
        justify-content: center;
      `;
    }
  }};
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
