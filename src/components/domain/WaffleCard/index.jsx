import React, { useCallback, useMemo } from 'react';
import Common from '@styles';
import PropTypes from 'prop-types';
import { Card, Text, Icons } from '@components';
import styled from '@emotion/styled';

const countDaysFromToday = date => {
  date = typeof date === 'string' ? new Date(date) : date;
  const today = new Date();
  return Math.floor((today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
};

const StyledCard = styled(Card)`
  box-sizing: border-box;
  padding: 18px;
  cursor: pointer;
  @media screen and (max-width: 1024px) {
  }
`;

const InfoContainer = styled.div`
  width: 100%;
  height: 18px;
  display: flex;
  justify-content: space-between;
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100px;
  & span:nth-of-type(1) {
    margin-right: 6px;
  }
  & div:nth-of-type(1) {
    margin-right: 8px;
  }
  & span:nth-of-type(2) {
    margin-right: 4px;
  }
`;

const EmojiText = styled(Text)`
  margin: 18px;
`;

const HashTagWrapper = styled.div`
  display: inline-flex;
  padding: 14px 0;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.18);
  border-radius: 9px;
`;

const HashTag = styled(Text)`
  width: 90%;
  padding: 0 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  box-sizing: border-box;
  text-align: center;
`;

const WaffleCard = ({
  type,
  card,
  width,
  height,
  onClickCard,
  onClickLikeIcon,
  onClickFavoriteIcon,
  ...props
}) => {
  const {
    id = 'edit',
    emoji = '🧇',
    cardColor = Common.colors.yellow,
    createdAt = new Date(),
    favoriteToggle = false,
    favoriteCount = 0,
    likeToggle = false,
    likeCount = 0,
    hashTags = [],
  } = card;
  const days = useMemo(() => countDaysFromToday(createdAt), [createdAt]);

  const handleClickCard = useCallback(
    e => {
      const cardId = e.target.closest('[data-id]').dataset.id;
      onClickCard && onClickCard(cardId);
    },
    [onClickCard],
  );

  const handleClickLikeIcon = useCallback(
    e => {
      e.stopPropagation();
      onClickLikeIcon && onClickLikeIcon(e);
    },
    [onClickLikeIcon],
  );

  const handleClickFavoriteIcon = useCallback(
    e => {
      e.stopPropagation();
      onClickFavoriteIcon && onClickFavoriteIcon(e);
    },
    [onClickFavoriteIcon],
  );

  return (
    <StyledCard
      data-id={id}
      backgroundColor={cardColor}
      width={width}
      height={height}
      onClick={handleClickCard}
      {...props}>
      <InfoContainer>
        <Text block>{days === 0 ? '오늘' : `${days}일 전`}</Text>
        <IconWrapper size={8}>
          <Icons.Like
            fontSize={'20px'}
            active={likeToggle}
            onClick={handleClickLikeIcon}
          />
          <Text block>{favoriteCount}</Text>
          <Icons.Favorite
            fontSize={'20px'}
            active={favoriteToggle}
            onClick={handleClickFavoriteIcon}
          />
          <Text block>{likeCount}</Text>
        </IconWrapper>
      </InfoContainer>
      <EmojiText block size={70}>
        {emoji}
      </EmojiText>
      <HashTagWrapper>
        {hashTags.map((hashTag, index) => (
          <HashTag size={20} block key={index}>
            {`#${hashTag}`}
          </HashTag>
        ))}
      </HashTagWrapper>
    </StyledCard>
  );
};

WaffleCard.defaultProps = {
  card: {},
  width: 256,
};

WaffleCard.protoTypes = {
  card: PropTypes.object,
  width: PropTypes.number,
  height: PropTypes.number,
  onClickCard: PropTypes.func,
  onClickLikeIcon: PropTypes.func,
  onClickFavoriteIcon: PropTypes.func,
};

export default WaffleCard;
