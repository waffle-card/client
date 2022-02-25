import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { userState } from '@/recoils';
import { useRecoilValue } from 'recoil';
import { useWaffleCardsState } from '@/contexts';
import { useIsOverflow } from '@/hooks';
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
              >
                {[...waffleCards, ...waffleCards]?.map(waffleCard => (
                  <StyledWaffleCard
                    type={type}
                    key={waffleCard.id}
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
