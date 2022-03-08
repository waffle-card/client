import React, { useState } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { userState } from '@/recoils';
import { useRecoilValue } from 'recoil';
import { useWaffleCardsState } from '@/contexts';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useIsOverflow, useInterval } from '@/hooks';
import { WaffleCard, EmptyCard, LoginGuide, NoCardGuide } from '@/components';
import { css } from '@emotion/react';
import Common from '@/styles';

const WaffleCardsList = ({
  type,
  onClickWaffleCard,
  onClickWaffleCardCreate,
  onClickWaffleCardEdit,
  onClickWaffleCardDelete,
  onClickLikeToggle,
  ...props
}: WaffleCardsListProps) => {
  const user = useRecoilValue(userState);
  const waffleCards = useWaffleCardsState();
  const [containerRef, isOverflow] = useIsOverflow();
  const [isPlayMove, setIsPlayMove] = useState(true);
  const containerDom = containerRef.current;

  const handleClickWaffleCard = (waffleCard: WaffleCardType) => {
    onClickWaffleCard && onClickWaffleCard(waffleCard);
  };

  const handleClickWaffleCardCreate = () => {
    onClickWaffleCardCreate && onClickWaffleCardCreate();
  };

  const handleClickWaffleCardEdit = (waffleCard: WaffleCardType) => {
    onClickWaffleCardEdit && onClickWaffleCardEdit(waffleCard);
  };

  const handleClickWaffleCardDelete = async (waffleCardId: string) => {
    onClickWaffleCardDelete && onClickWaffleCardDelete(waffleCardId);
  };

  const handleClickLikeToggle = (
    waffleCardId: string,
    likeToggled: boolean,
  ) => {
    onClickLikeToggle && onClickLikeToggle(waffleCardId, likeToggled);
  };

  const handleClickFrontButton = () => {
    containerDom.scrollLeft = 0;
    setIsPlayMove(true);
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
    <StyledDiv>
      <PrevIcon
        onClick={handleClickFrontButton}
        onMouseOver={() => {
          setIsPlayMove(false);
        }}
      />
      <NextIcon
        onClick={handleClickBackButton}
        onMouseOver={() => {
          setIsPlayMove(false);
        }}
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
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  position: relative;
`;

const moveIconStyle = css`
  position: absolute;
  top: 45%;
  box-sizing: content-box;
  padding: 1rem;
  font-size: 2.7rem;
  border-radius: 50px;
  color: ${Common.colors.point};
  background-color: rgba(255, 255, 255, 0.2);
  transition: all 0.4s ease;
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
    box-shadow: 0 0 2px 5px rgb(255, 255, 255, 0.2);
  }
  @media ${Common.media.sm} {
    padding: 0.5rem;
    font-size: 2rem;
  }
  z-index: 2;
`;

const PrevIcon = styled(ArrowBackIosNewIcon)`
  ${moveIconStyle}
  left: 3%;
`;

const NextIcon = styled(ArrowForwardIosIcon)`
  ${moveIconStyle}
  right: 3%;
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
  display: flex;
  justify-content: ${({ isOverflow }) =>
    isOverflow ? 'flex-start' : 'center'};
  align-items: center;
  position: relative;
  padding-top: 2rem;
  margin: 4rem 0;
  overflow-x: auto;
  transition: all 0.4s ease;
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
