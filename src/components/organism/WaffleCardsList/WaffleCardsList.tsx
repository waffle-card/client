import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { userState } from '@/recoils';
import { useRecoilValue } from 'recoil';
import { useWaffleCardsState } from '@/contexts';
import { useIsOverflow, useScrollAnimation, useHover } from '@/hooks';
import { WaffleCard, EmptyCard, LoginGuide, NoCardGuide } from '@/components';
import ArrowButtons from './ArrowButtons';
import { css } from '@emotion/react';
import { WaffleCardType } from '@/types';

interface WaffleCardsListProps extends React.ComponentProps<'article'> {
  type?: 'total' | 'my' | 'like';
  onClickWaffleCard?: (waffleCard: WaffleCardType) => void;
  onClickWaffleCardCreate?: () => void;
  onClickWaffleCardEdit?: (waffleCard: WaffleCardType) => void;
  onClickWaffleCardDelete?: (waffleCardId: string) => void;
  onClickLikeToggle?: (waffleCardId: string, likeToggled: boolean) => void;
}

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
  const [cardsListRef, isOverflow] = useIsOverflow();
  const [ref, isHover] = useHover<HTMLDivElement>();
  const {
    isShowingLastEl,
    setIsPlaying,
    setObserveTarget,
    moveScrollToFront,
    moveScrollToBack,
  } = useScrollAnimation(cardsListRef.current, [type]);

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

  useEffect(() => {
    isHover ? setIsPlaying(false) : !isShowingLastEl && setIsPlaying(true);
  }, [isHover, isShowingLastEl, setIsPlaying]);

  return (
    <Container ref={ref}>
      <CardsList
        ref={cardsListRef}
        isOverflow={isOverflow}
        type={type}
        {...props}
      >
        {!user && type !== 'total' ? (
          <LoginGuide />
        ) : (
          (() => {
            if (type === 'my' && waffleCards && waffleCards.length <= 0) {
              return <EmptyCard onClick={handleClickWaffleCardCreate} />;
            }
            if (waffleCards && waffleCards.length <= 0) {
              return <NoCardGuide />;
            } else {
              return (
                <>
                  {waffleCards?.map(waffleCard => (
                    <StyledWaffleCard
                      type={type === 'my' ? 'my' : 'basic'}
                      key={waffleCard.id}
                      waffleCardData={waffleCard}
                      onClickWaffleCard={handleClickWaffleCard}
                      onClickLikeToggle={handleClickLikeToggle}
                      onClickEdit={handleClickWaffleCardEdit}
                      onClickDelete={handleClickWaffleCardDelete}
                    />
                  ))}
                  <LastItem ref={setObserveTarget}></LastItem>
                </>
              );
            }
          })()
        )}
      </CardsList>
      {isOverflow && (
        <ArrowButtons
          onClickPrev={moveScrollToFront}
          onClickNext={moveScrollToBack}
        />
      )}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
`;

const CardsList = styled.article<{
  isOverflow: boolean;
  type?: 'total' | 'my' | 'like';
}>`
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
  overflow-x: auto;
  transition: all 0.4s ease;
  -ms-overflow-style: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const LastItem = styled.div`
  margin: 0 5px;
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
