import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { userState } from '@recoil';
import { useRecoilValue } from 'recoil';
import { useWaffleCardsState } from '@contexts';
import { useIsOverflow } from '@hooks';
import { WaffleCard, Card, LoginGuide, NoCardGuide } from '@components';

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
  const [containerRef, isOverflow] = useIsOverflow(type);

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
    <Container ref={containerRef} isOverflow={isOverflow} {...props}>
      {!user && type !== 'total' ? (
        <LoginGuide />
      ) : (
        (() => {
          if (waffleCards.length <= 0) {
            if (type === 'my') {
              return <Card.Empty onClick={handleClickWaffleCardCreate} />;
            }
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
  );
};

const Container = styled.section`
  display: flex;
  justify-content: ${({ isOverflow }) =>
    isOverflow ? 'flex-start' : 'center'};
  align-items: center;
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
