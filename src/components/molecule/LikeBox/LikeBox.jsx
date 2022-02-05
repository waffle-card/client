import React, { useState } from 'react';
import Swal from 'sweetalert2';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Common from '@styles';
import { Icons, Text } from '@components';

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledText = styled(Text)`
  @media ${Common.media.sm} {
    font-size: ${Common.fontSize.base};
    margin-left: 4px;
  }
  @media ${Common.media.md} {
    font-size: ${Common.fontSize.medium};
    margin-left: 8px;
  }
  @media ${Common.media.lg} {
    font-size: ${Common.fontSize.large};
    margin-left: 10px;
  }
`;

const LikeBox = ({
  active = false,
  interactive = false,
  onClick,
  count: initCount = 0,
  ...props
}) => {
  const [toggle, setToggle] = useState(active);
  const [count, setCount] = useState(initCount);

  const handleClick = e => {
    e.stopPropagation();

    if (!interactive) {
      Swal.fire({
        icon: 'warning',
        text: '좋아요는 로그인 후 사용 가능합니다.',
        confirmButtonColor: Common.colors.point,
      });
      return;
    }

    const nextToggle = !toggle;
    const nextCount = nextToggle ? count + 1 : count - 1;

    onClick && onClick(nextToggle, nextCount);

    setCount(() => nextCount);
    setToggle(() => nextToggle);
  };

  return (
    <IconWrapper {...props}>
      {toggle ? (
        <Icons fontSize={'20px'}>
          <Icons.Like active onClick={handleClick} />
        </Icons>
      ) : (
        <Icons fontSize={'20px'}>
          <Icons.Like onClick={handleClick} />
        </Icons>
      )}
      <StyledText block>{count}</StyledText>
    </IconWrapper>
  );
};

LikeBox.protoTypes = {
  onClickLikeIcon: PropTypes.func,
  onClickBookmarkIcon: PropTypes.func,
  likeToggle: PropTypes.bool,
  likeCount: PropTypes.number,
  bookmarkToggle: PropTypes.bool,
  bookmarkCount: PropTypes.number,
};

export default LikeBox;
