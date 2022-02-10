import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Common from '@styles';
import { useHover } from '@hooks';
import { useUser } from '@contexts';
import { Card, Text, LikeBox, EditBox } from '@components';

const countDaysFromToday = date => {
  date = typeof date === 'string' ? new Date(date) : date;
  const today = new Date();
  return Math.floor((today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
};

const WaffleCard = ({
  type,
  waffleCardData,
  onClickWaffleCard,
  onClickLikeToggle,
  likeToggled,
  onClickEdit,
  onClickDelete,
  ...props
}) => {
  const { userInfo } = useUser();
  const [ref, isHovered] = useHover();
  const days =
    type !== 'plain' ? countDaysFromToday(waffleCardData.updatedAt) : 0;

  const handleClickLikeToggle = likeToggled => {
    onClickLikeToggle && onClickLikeToggle(waffleCardData.id, likeToggled);
  };

  const handleClickWaffleCard = () => {
    onClickWaffleCard && onClickWaffleCard(waffleCardData.id);
  };

  const handleClickEdit = () => {
    if (type !== 'my') return;
    onClickEdit && onClickEdit(waffleCardData.id);
  };

  const handleClickDelete = () => {
    if (type !== 'my') return;
    onClickDelete && onClickDelete(waffleCardData.id);
  };

  return (
    <Container ref={ref} {...props}>
      {type === 'my' && isHovered && (
        <StyledEditBox
          onClickUpdate={handleClickEdit}
          onClickDelete={handleClickDelete}
        />
      )}
      <StyledCard
        backgroundColor={waffleCardData.color}
        onClick={handleClickWaffleCard}>
        {type !== 'plain' && (
          <InfoContainer>
            <StyledText block>{days <= 0 ? '오늘' : `${days}일 전`}</StyledText>
            <LikeBox
              onClick={handleClickLikeToggle}
              active={likeToggled}
              interactive={!!userInfo}
              count={waffleCardData.likeUserIds.length}
            />
          </InfoContainer>
        )}
        <EmojiText block size={70}>
          {waffleCardData.emoji}
        </EmojiText>
        <HashTagWrapper>
          {waffleCardData.hashTags.map((hashTag, index) => (
            <HashTag size={20} block key={index}>
              {`#${hashTag}`}
            </HashTag>
          ))}
        </HashTagWrapper>
      </StyledCard>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
`;

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

const EmojiText = styled.p`
  margin: 1rem;
  @media ${Common.media.sm} {
    font-size: 40px;
  }
  @media ${Common.media.md} {
    font-size: 50px;
  }
  @media ${Common.media.lg} {
    font-size: 70px;
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

const StyledEditBox = styled(EditBox)`
  position: absolute;
  top: -1rem;
  z-index: 2;
`;

WaffleCard.protoTypes = {
  type: PropTypes.string,
  waffleCardData: PropTypes.object,
  onClickEdit: PropTypes.func,
  onClickDelete: PropTypes.func,
};

WaffleCard.defaultProps = {
  type: 'basic',
  waffleCardData: {
    id: 'test',
    emoji: '🧇',
    color: Common.colors.yellow,
    hashTags: [],
  },
};

export default WaffleCard;
