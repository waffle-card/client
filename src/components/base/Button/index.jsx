import styled from '@emotion/styled';
import { useCallback } from 'react';
import PropTypes from 'prop-types';

const StyledButton = styled.button`
  --width: ${({ width }) => {
    return typeof width === 'number' ? `${width}px` : width;
  }};
  --height: ${({ height }) => {
    return typeof height === 'number' ? `${height}px` : height;
  }};
  --font-size: ${({ fontSize }) => {
    return typeof fontSize === 'number' ? `${fontSize}px` : fontSize;
  }};
  --font-color: ${({ fontColor }) => fontColor};
  --background-color: ${({ backgroundColor }) => backgroundColor};
  --border-radius: ${({ width }) => {
    if (typeof width === 'number') {
      return width < 250 ? '12px' : '16px';
    } else {
      return '16px';
    }
  }};

  box-sizing: border-box;
  display: block;
  width: var(--width);
  height: var(--height);
  padding: 8px 6px;
  font-size: var(--font-size);
  color: var(--font-color);
  cursor: pointer;
  background-color: var(--background-color);
  border: none;
  border-radius: var(--border-radius);
  outline: none;

  &:hover {
    opacity: 0.8;
  }

  &:disabled {
    background-color: #888;
  }

  &:active {
    border: solid 2px var(--font-color);
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
  ...props
}) => {
  const handleClick = useCallback(() => {
    onClick && onClick();
  }, [onClick]);

  return (
    <StyledButton
      onClick={handleClick}
      width={width}
      height={height}
      backgroundColor={backgroundColor}
      fontSize={fontSize}
      fontColor={fontColor}
      {...props}>
      {children}
    </StyledButton>
  );
};

Button.propTypes = {
  children: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  backgroundColor: PropTypes.string,
  fontColor: PropTypes.string,
  fontSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onClick: PropTypes.func,
};

Button.defaultProps = {
  width: 550,
  height: 56,
  backgroundColor: '#FFD039',
  fontColor: '#fff',
  fontSize: '18px',
};

export default Button;
