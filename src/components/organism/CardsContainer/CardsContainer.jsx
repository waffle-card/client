import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import Common from '@styles';
import { WaffleCard, Card } from '@components';
import LoginGuide from './LoginGuide';
import NoCardGuide from './NoCardGuide';
import { useUser } from '@contexts';

const CardsContainer = ({
  type,
  waffleCardsData,
  onClickWaffleCard,
  onClickWaffleCardCreate,
  onClickWaffleCardEdit,
  onClickWaffleCardDelete,
  onClickLikeToggle,
  onSubmit,
  ...props
}) => {
  const { userInfo } = useUser();

  const handleClickWaffleCard = waffleCardId => {
    onClickWaffleCard && onClickWaffleCard(waffleCardId);
  };

  const handleClickWaffleCardCreate = () => {
    onClickWaffleCardCreate && onClickWaffleCardCreate();
  };

  const handleClickWaffleCardEdit = waffleCardId => {
    onClickWaffleCardEdit && onClickWaffleCardEdit(waffleCardId);
  };

  const handleClickWaffleCardDelete = async waffleCardId => {
    onClickWaffleCardDelete && onClickWaffleCardDelete(waffleCardId);
  };

  const handleClickLikeToggle = (waffleCardId, likeToggled) => {
    onClickLikeToggle && onClickLikeToggle(waffleCardId, likeToggled);
  };

  switch (type) {
    case 'total':
      if (waffleCardsData.length <= 0) {
        return (
          <CenterAlignedContainer>
            <NoCardGuide />
          </CenterAlignedContainer>
        );
      } else {
        return (
          <LeftAlignedContainer {...props}>
            {waffleCardsData.map(waffleCard => (
              <StyledWaffleCard
                type="basic"
                key={waffleCard.id}
                waffleCardData={waffleCard}
                onClickWaffleCard={handleClickWaffleCard}
                likeToggled={
                  waffleCard && waffleCard.likeUserIds.includes(userInfo?.id)
                }
                onClickLikeToggle={handleClickLikeToggle}
              />
            ))}
          </LeftAlignedContainer>
        );
      }
    case 'my':
      if (!userInfo) {
        return (
          <CenterAlignedContainer>
            <LoginGuide />
          </CenterAlignedContainer>
        );
      } else if (waffleCardsData.length <= 0) {
        return (
          <CenterAlignedContainer>
            <Card.Empty onClick={handleClickWaffleCardCreate} />
          </CenterAlignedContainer>
        );
      } else {
        return (
          <CenterAlignedContainer {...props}>
            {waffleCardsData.map(waffleCard => (
              <StyledWaffleCard
                type="my"
                key={waffleCard.id}
                waffleCardData={waffleCard}
                onClickWaffleCard={handleClickWaffleCard}
                likeToggled={
                  waffleCard && waffleCard?.likeUserIds.includes(userInfo?.id)
                }
                onClickLikeToggle={handleClickLikeToggle}
                onClickEdit={handleClickWaffleCardEdit}
                onClickDelete={handleClickWaffleCardDelete}
              />
            ))}
          </CenterAlignedContainer>
        );
      }
    case 'like':
      if (!userInfo) {
        return (
          <CenterAlignedContainer>
            <LoginGuide />
          </CenterAlignedContainer>
        );
      } else if (waffleCardsData.length <= 0) {
        return (
          <CenterAlignedContainer>
            <NoCardGuide />
          </CenterAlignedContainer>
        );
      } else {
        return (
          <LeftAlignedContainer {...props}>
            {waffleCardsData.map(waffleCard => (
              <StyledWaffleCard
                type="basic"
                key={waffleCard.id}
                waffleCardData={waffleCard}
                onClickWaffleCard={handleClickWaffleCard}
                likeToggled={
                  waffleCard && waffleCard.likeUserIds.includes(userInfo?.id)
                }
                onClickLikeToggle={handleClickLikeToggle}
              />
            ))}
          </LeftAlignedContainer>
        );
      }
    default:
      return null;
  }
};

const LeftAlignedContainer = styled.section`
  position: relative;
  display: flex;
  align-items: center;
  height: 500px;
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

const CenterAlignedContainer = styled.section`
  position: relative;
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  height: 500px;
  padding: 35px 0;
  margin-top: 5vh;
  overflow-x: scroll;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const StyledWaffleCard = styled(WaffleCard)`
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
  onClickWaffleCard: PropTypes.func,
  onClickWaffleCardCreate: PropTypes.func,
  onClickWaffleCardEdit: PropTypes.func,
  onClickWaffleCardDelete: PropTypes.func,
};

CardsContainer.defaultProps = {
  type: 'total',
};

export default CardsContainer;
