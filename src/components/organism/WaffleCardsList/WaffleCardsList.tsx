import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { userState } from '@/recoils';
import { useRecoilValue } from 'recoil';
import { useWaffleCardsState } from '@/contexts';
import { useIsOverflow } from '@/hooks';
import { WaffleCard, EmptyCard, LoginGuide, NoCardGuide } from '@/components';
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
  const [containerRef, isOverflow] = useIsOverflow();

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

  return (
    <Container ref={containerRef} isOverflow={isOverflow} {...props}>
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
            return waffleCards?.map(waffleCard => (
              <StyledWaffleCard
                type={type === 'my' ? 'my' : 'basic'}
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

const Container = styled.article<{ isOverflow: boolean }>`
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
