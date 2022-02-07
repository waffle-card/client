import React from 'react';
import Common from '@styles';
import PropTypes from 'prop-types';
import { Card, Text, LikeBox } from '@components';
import styled from '@emotion/styled';

const countDaysFromToday = date => {
  date = typeof date === 'string' ? new Date(date) : date;
  const today = new Date();
  return Math.floor((today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
};

const WaffleCard = ({
  waffleCardData,
  onClickWaffleCard,
  onClickLike,
  ...props
}) => {
  const { emoji, color, hashTags, updatedAt } = waffleCardData;
  const days = countDaysFromToday(updatedAt);

  const handleClickLikeBox = () => {};

  return (
    <StyledCard backgroundColor={color} {...props}>
      <InfoContainer>
        <StyledText block>{days <= 0 ? '오늘' : `${days}일 전`}</StyledText>
        <LikeBox onClick={handleClickLikeBox} interactive />
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

const StyledCard = styled(Card)`
  position: relative;
  box-sizing: border-box;
  padding: 18px;
  cursor: pointer;
  @media ${Common.media.sm} {
    font-size: ${Common.fontSize.micro};
  }
  @media ${Common.media.md} {
    font-size: ${Common.fontSize.small};
  }
  @media ${Common.media.lg} {
    font-size: ${Common.fontSize.base};
  }
`;

const EmojiText = styled(Text)`
  margin: 18px; // TODO: 리팩토링
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

const InfoContainer = styled.div`
  width: 100%;
  height: 18px;
  display: flex;
  justify-content: space-between;
`;

const StyledText = styled(Text)`
  @media ${Common.media.sm} {
    font-size: ${Common.fontSize.small};
  }
  @media ${Common.media.md} {
    font-size: ${Common.fontSize.base};
  }
  @media ${Common.media.lg} {
    font-size: ${Common.fontSize.medium};
  }
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
  font-size: 1rem;
  @media ${Common.media.sm} {
    font-size: ${Common.fontSize.micro};
  }
  @media ${Common.media.md} {
    font-size: ${Common.fontSize.base};
  }
  @media ${Common.media.lg} {
    font-size: ${Common.fontSize.large};
  }
`;

WaffleCard.protoTypes = {
  waffleCardData: PropTypes.object,
};

WaffleCard.defaultProps = {
  waffleCardData: {
    emoji: '🧇',
    color: Common.colors.yellow,
    hashTags: [],
  },
};

export default WaffleCard;
