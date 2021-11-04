import styled from '@emotion/styled';
import Common from '@styles';
import PropTypes from 'prop-types';
import { Icons, Text } from '@components';
import React, { useCallback, useState } from 'react';
import { useUser } from '@contexts';
import { cardApi } from '@apis';
import Swal from 'sweetalert2';

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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

const ToggleBox = ({
  cardInfo,
  onClickLikeIcon,
  onClickBookmarkIcon,
  likeToggle = false,
  likeCount = 0,
  bookmarkToggle = false,
  bookmarkCount = 0,
  ...props
}) => {
  const { userInfo } = useUser();
  const [toggleState, setToggleState] = useState({
    likeCount,
    bookmarkCount,
  });

  const handleClickLikeIcon = useCallback(
    async (e, likeToggled) => {
      e.stopPropagation();
      if (!userInfo) {
        Swal.fire({
          title: '🥲 Oops!',
          text: '좋아요는 로그인 이후에 가능합니다.',
          confirmButtonColor: Common.colors.point,
        });
        return;
      }
      try {
        if (!likeToggled) {
          await cardApi.addLikeCard(userInfo, cardInfo);
          setToggleState(toggleState => ({
            ...toggleState,
            likeCount: toggleState.likeCount + 1,
          }));
        } else {
          await cardApi.deleteLikeCard(userInfo, cardInfo);
          setToggleState(toggleState => ({
            ...toggleState,
            likeCount: toggleState.likeCount - 1,
          }));
        }
      } catch (error) {
        Swal.fire({
          title: '🥲 Oops!',
          text: error,
          confirmButtonColor: Common.colors.point,
        });
      }
      onClickLikeIcon && onClickLikeIcon(e);
    },
    [onClickLikeIcon, userInfo, cardInfo],
  );

  const handleClickBookmarkIcon = useCallback(
    async (e, bookmarkToggled) => {
      if (!userInfo) {
        Swal.fire({
          title: '🥲 Oops!',
          text: '즐겨찾기는 로그인 이후에 가능합니다.',
          confirmButtonColor: Common.colors.point,
        });
        return;
      }
      e.stopPropagation();
      try {
        if (!bookmarkToggled) {
          await cardApi.addBookmarkCard(userInfo, cardInfo);
          setToggleState(toggleState => ({
            ...toggleState,
            bookmarkCount: toggleState.bookmarkCount + 1,
          }));
        } else {
          await cardApi.deleteBookmarkCard(userInfo, cardInfo);
          setToggleState(toggleState => ({
            ...toggleState,
            bookmarkCount: toggleState.bookmarkCount - 1,
          }));
        }
      } catch (error) {
        Swal.fire({
          title: '🥲 Oops!',
          text: error,
          confirmButtonColor: Common.colors.point,
        });
      }
      onClickBookmarkIcon && onClickBookmarkIcon(e);
    },
    [onClickBookmarkIcon, userInfo, cardInfo],
  );

  return (
    <IconWrapper {...props}>
      <Icons fontSize={'20px'}>
        <Icons.Like active={likeToggle} onClick={handleClickLikeIcon} />
      </Icons>
      <StyledText block>{toggleState.likeCount}</StyledText>
      <Icons fontSize={'20px'}>
        <Icons.Bookmark
          active={bookmarkToggle}
          onClick={handleClickBookmarkIcon}
        />
      </Icons>
      <StyledText block>{toggleState.bookmarkCount}</StyledText>
    </IconWrapper>
  );
};

ToggleBox.protoTypes = {
  onClickLikeIcon: PropTypes.func,
  onClickBookmarkIcon: PropTypes.func,
  likeToggle: PropTypes.bool,
  likeCount: PropTypes.number,
  bookmarkToggle: PropTypes.bool,
  bookmarkCount: PropTypes.number,
};

export default ToggleBox;
