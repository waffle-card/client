import React, { useCallback, useMemo } from 'react';
import Common from '@styles';
import PropTypes from 'prop-types';
import { Card, Text, EditBox, ToggleBox } from '@components';
import styled from '@emotion/styled';
import { useHover } from '@hooks';
import { useHistory } from 'react-router-dom';
import { cardApi } from '@apis';
import Swal from 'sweetalert2';

const countDaysFromToday = date => {
  date = typeof date === 'string' ? new Date(date) : date;
  const today = new Date();
  return Math.floor((today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
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

const StyledEditBox = styled(EditBox)`
  position: absolute;
  top: -15px;
  right: 10px;
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

const WaffleCard = ({
  myCard,
  cardData,
  width,
  height,
  onClickCard,
  onClickLikeIcon,
  onClickBookmarkIcon,
  onClickEditIcon,
  onClickDeleteIcon,
  ...props
}) => {
  const {
    id: cardId = 'null',
    emoji = '🧇',
    cardColor = Common.colors.yellow,
    createdAt = new Date(),
    hashTags = [],
  } = cardData || {};
  const history = useHistory();
  const [ref, hover] = useHover(null);
  const days = useMemo(() => countDaysFromToday(createdAt), [createdAt]);

  const handleClickCard = useCallback(
    e => {
      const cardId = e.target.closest('[data-id]').dataset.id;
      onClickCard && onClickCard(cardId);
    },
    [onClickCard],
  );

  const handleClickEditIcon = e => {
    history.push({
      pathname: `/cards/my/update/${cardId}`,
      state: { cardId: cardId },
    });
    onClickEditIcon && onClickEditIcon(e);
  };

  const handleClickDeleteIcon = async e => {
    const deleteCard = async () => {
      await cardApi.deleteCard(cardId);
      Swal.fire({
        title: '😝',
        text: '와플카드가 삭제되었어요!',
        confirmButtonColor: Common.colors.point,
      }).then(() => {
        window.location.reload();
      });
    };
    try {
      Swal.fire({
        title: '🤔',
        text: '정말 와플카드를 삭제하실껀가요?',
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonColor: Common.colors.point,
        cancelButtonColor: 'red',
      }).then(res => {
        if (res.isConfirmed) {
          deleteCard();
        }
      });
    } catch (error) {
      Swal.fire({
        title: '🤯',
        text: error,
        confirmButtonColor: Common.colors.point,
      });
    }

    onClickDeleteIcon && onClickDeleteIcon(e);
  };

  return (
    <StyledCard
      data-id={cardId}
      backgroundColor={cardColor}
      width={width}
      height={height}
      onClick={handleClickCard}
      ref={ref}
      {...props}>
      {myCard && hover ? (
        <StyledEditBox
          onEditIconClick={handleClickEditIcon}
          onDeleteIconClick={handleClickDeleteIcon}
        />
      ) : null}
      <InfoContainer>
        <StyledText block>{days <= 0 ? '오늘' : `${days}일 전`}</StyledText>
        <ToggleBox cardInfo={cardData} onClickLikeIcon={onClickLikeIcon} />
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
  myCard: false,
  cardData: {
    cardId: 'null',
    emoji: '🧇',
    cardColor: Common.colors.yellow,
    createdAt: new Date(),
    hashTags: [],
    likes: [],
  },
  width: 256,
};

WaffleCard.protoTypes = {
  myCard: PropTypes.bool,
  cardData: PropTypes.object,
  width: PropTypes.number,
  height: PropTypes.number,
  onClickCard: PropTypes.func,
  onClickLikeIcon: PropTypes.func,
  onClickBookmarkIcon: PropTypes.func,
};

export default WaffleCard;
