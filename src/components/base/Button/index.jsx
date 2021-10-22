import styled from '@emotion/styled';
import { useCallback } from 'react';
import PropTypes from 'prop-types';

const StyledButton = styled.button`
  box-sizing: border-box;
  display: block;
  width: ${({ width }) => {
    return typeof width === 'number' ? `${width}px` : width;
  }};
  height: ${({ height }) => {
    return typeof height === 'number' ? `${height}px` : height;
  }};
  padding: 8px 6px;
  font-size: ${({ fontsize }) => {
    return typeof fontsize === 'number' ? `${fontsize}px` : fontsize;
  }};
  color: ${({ fontcolor }) => fontcolor};
  cursor: pointer;
  background-color: ${({ backgroundcolor }) => backgroundcolor};
  border: none;
  border-radius: ${({ width }) => {
    if (typeof width === 'number') {
      return width < 250 ? '12px' : '16px';
    } else {
      return '16px';
    }
  }};
  outline: none;

  &:hover {
    opacity: 0.8;
  }

  &:disabled {
    background-color: #888;
  }

  &:active {
    border: solid 2px ${({ fontcolor }) => fontcolor};
  }
`;

const Button = ({
  children,
  width,
  height,
  backgroundColor,
  fontColor,
  fontSize,
  onClick,
}) => {
  const handleClick = useCallback(() => {
    onClick && onClick();
  }, [onClick]);

  return (
    <StyledButton
      width={width}
      height={height}
      backgroundcolor={backgroundColor}
      fontcolor={fontColor}
      fontsize={fontSize}
      onClick={handleClick}>
      {children}
    </StyledButton>
  );
};

Button.propTypes = {
  children: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  backgroundColor: PropTypes.string.isRequired,
  fontColor: PropTypes.string.isRequired,
  fontSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    .isRequired,
  onClick: PropTypes.func,
};

export default Button;
