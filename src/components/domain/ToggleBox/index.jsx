import styled from '@emotion/styled';
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Icons, Text } from '@components';
import Common from '@styles';

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
  onClickLikeIcon,
  onClickBookmarkIcon,
  likeToggle = false,
  likeCount = 0,
  bookmarkToggle = false,
  bookmarkCount = 0,
  ...props
}) => {
  const handleClickLikeIcon = useCallback(
    e => {
      e.stopPropagation();
      onClickLikeIcon && onClickLikeIcon(e);
    },
    [onClickLikeIcon],
  );

  const handleClickBookmarkIcon = useCallback(
    e => {
      e.stopPropagation();
      onClickBookmarkIcon && onClickBookmarkIcon(e);
    },
    [onClickBookmarkIcon],
  );

  return (
    <IconWrapper>
      <Icons fontSize={'20px'}>
        <Icons.Like active={likeToggle} onClick={handleClickLikeIcon} />
      </Icons>
      <StyledText block>{bookmarkCount}</StyledText>
      <Icons fontSize={'20px'}>
        <Icons.Bookmark
          active={bookmarkToggle}
          onClick={handleClickBookmarkIcon}
        />
      </Icons>
      <StyledText block>{likeCount}</StyledText>
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
