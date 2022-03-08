import React from 'react';
import Common from '@/styles';
import { useHover } from '@/hooks';
import { LikeToggle } from '@/components';
import { userState } from '@/recoils';
import { useRecoilValue } from 'recoil';
import * as S from './WaffleCard.style';
import { WaffleCardType } from '@/types';
import { countDaysFromToday } from '@/utils';

interface WaffleCardProps extends React.ComponentProps<'div'> {
  type?: 'basic' | 'plain' | 'my';
  waffleCardData?: Partial<WaffleCardType>;
  onClickWaffleCard?: (waffleCard: WaffleCardType) => void;
  onClickLikeToggle?: (waffleCardId: string, likeToggled: boolean) => void;
  onClickEdit?: (waffleCard: WaffleCardType) => void;
  onClickDelete?: (waffleCardId: string) => void;
}

const WaffleCard = ({
  type = 'basic',
  waffleCardData = {
    emoji: '🧇',
    color: Common.colors.yellow,
    hashTags: [],
  },
  onClickWaffleCard,
  onClickLikeToggle,
  onClickEdit,
  onClickDelete,
  ...props
}: WaffleCardProps) => {
  const user = useRecoilValue(userState);
  const [ref, isHovered] = useHover<HTMLDivElement>();

  const days =
    type !== 'plain' && waffleCardData && waffleCardData.updatedAt
      ? countDaysFromToday(waffleCardData.updatedAt)
      : 0;

  const handleClickLikeToggle = (likeToggled: boolean) => {
    if (!waffleCardData || !waffleCardData.id) return;
    onClickLikeToggle && onClickLikeToggle(waffleCardData.id, likeToggled);
  };

  const handleClickWaffleCard = () => {
    if (!waffleCardData) return;
    onClickWaffleCard && onClickWaffleCard(waffleCardData as WaffleCardType);
  };

  const handleClickEdit = () => {
    if (type !== 'my' || !waffleCardData) return;
    onClickEdit && onClickEdit(waffleCardData as WaffleCardType);
  };

  const handleClickDelete = () => {
    if (type !== 'my' || !waffleCardData || !waffleCardData.id) return;
    onClickDelete && onClickDelete(waffleCardData.id);
  };

  return (
    <S.Container ref={ref} {...props}>
      {type === 'my' && isHovered && (
        <S.EditBox
          onClickUpdate={handleClickEdit}
          onClickDelete={handleClickDelete}
        />
      )}
      <S.Card
        backgroundColor={waffleCardData?.color}
        onClick={handleClickWaffleCard}
      >
        {type !== 'plain' && (
          <S.InfoContainer>
            <S.Text block>{days <= 0 ? '오늘' : `${days}일 전`}</S.Text>
            <LikeToggle
              onClick={handleClickLikeToggle}
              toggled={
                user && waffleCardData.likeUserIds
                  ? waffleCardData.likeUserIds.includes(user.id)
                  : false
              }
              interactive={!!user}
              count={
                waffleCardData.likeUserIds && waffleCardData.likeUserIds.length
              }
            />
          </S.InfoContainer>
        )}
        <S.EmojiText>{waffleCardData?.emoji}</S.EmojiText>
        <S.HashTagWrapper>
          {waffleCardData &&
            waffleCardData.hashTags &&
            waffleCardData.hashTags.map((hashTag, index) => (
              <S.HashTag size={20} block key={index}>
                {`#${hashTag}`}
              </S.HashTag>
            ))}
        </S.HashTagWrapper>
      </S.Card>
    </S.Container>
  );
};

export default WaffleCard;
