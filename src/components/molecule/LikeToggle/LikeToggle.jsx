import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { IconButton } from '@mui/material';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import Common from '@/styles';
import { Text } from '@/components';

const LikeToggle = ({
  toggled,
  interactive,
  onClick,
  count: initCount = 0,
  ...props
}) => {
  const [toggle, setToggle] = useState(toggled);
  const [count, setCount] = useState(initCount);

  const handleClick = e => {
    e.stopPropagation();

    if (!interactive) return;

    const nextToggle = !toggle;
    const nextCount = nextToggle ? count + 1 : count - 1;

    onClick && onClick(nextToggle, nextCount);

    setCount(() => nextCount);
    setToggle(() => nextToggle);
  };

  useEffect(() => {
    setToggle(toggled);
    setCount(initCount);
  }, [initCount, toggled]);

  return (
    <IconWrapper {...props}>
      <IconButton onClick={handleClick}>
        {toggle ? <LikeFilledIcon /> : <LikeEmptyIcon />}
      </IconButton>
      <StyledText block>{count}</StyledText>
    </IconWrapper>
  );
};

const LikeFilledIcon = styled(FavoriteRoundedIcon)`
  color: ${Common.colors.primary};
`;

const LikeEmptyIcon = styled(FavoriteBorderRoundedIcon)`
  color: ${Common.colors.primary};
`;

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

LikeToggle.protoTypes = {
  toggled: PropTypes.bool,
  interactive: PropTypes.bool,
  count: PropTypes.number,
  onClick: PropTypes.func,
};

LikeToggle.defaultProps = {
  toggled: false,
  interactive: false,
  count: 0,
};

export default LikeToggle;
