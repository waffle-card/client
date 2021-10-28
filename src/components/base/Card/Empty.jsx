import styled from '@emotion/styled';
import React, { useCallback } from 'react';
import { Icons, Text } from '@components';
import PropTypes from 'prop-types';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: ${({ width }) => (typeof width === 'number' ? `${width}px` : width)};
  height: ${({ width, height }) => {
    if (height) {
      return typeof height === 'number' ? `${height}px` : height;
    } else {
      return typeof width === 'number'
        ? `${width * 1.56}px`
        : `calc(${width} * 1.56)`;
    }
  }};
  background-color: ${({ backgroundColor }) => backgroundColor};
  border: 5px dashed black;
  border-radius: 16px;
  box-sizing: border-box;
`;

const Empty = ({ width, height, fontSize, iconSize, onClick, ...props }) => {
  const handleClick = useCallback(
    e => {
      onClick && onClick(e);
    },
    [onClick],
  );

  return (
    <Container width={width} onClick={handleClick} {...props}>
      <Icons.Add fontSize={iconSize} color="black" />
      <Text size={fontSize} color="black">
        카드 만들기
      </Text>
    </Container>
  );
};

Empty.propTypes = {
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  fontSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  iconSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onClick: PropTypes.func,
};

Empty.defaultProps = {
  width: '256px',
  iconSize: '4rem',
};

export default Empty;
