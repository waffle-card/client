import styled from '@emotion/styled';
import { useCallback } from 'react';
import PropTypes from 'prop-types';
import Common from '@styles';

const StyledButton = styled.button`
  --width: ${({ width }) => (typeof width === 'number' ? `${width}px` : width)};
  --height: ${({ height }) =>
    typeof height === 'number' ? `${height}px` : height};
  --font-size: ${({ fontSize }) =>
    typeof fontSize === 'number' ? `${fontSize}px` : fontSize};
  --font-color: ${({ fontColor }) => fontColor};
  --background-color: ${({ backgroundColor }) => backgroundColor};
  --border-radius: ${({ width }) => {
    if (typeof width === 'number') {
      return width < 250 ? '12px' : '16px';
    } else {
      const tmpWidth = parseInt(width, 10);
      return tmpWidth < 250 ? '12px' : '16px';
    }
  }};

  box-sizing: border-box;
  display: block;
  width: var(--width);
  min-width: 80px;
  max-width: 550px;
  height: var(--height);
  min-height: 40px;
  max-height: 56px;
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
    opacity: 0.5;
    cursor: default;
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
  disabled = false,
  onClick,
  ...props
}) => {
  const handleClick = useCallback(
    event => {
      onClick && onClick(event);
    },
    [onClick],
  );

  return (
    <StyledButton
      onClick={handleClick}
      width={width}
      height={height}
      backgroundColor={backgroundColor}
      fontSize={fontSize}
      fontColor={fontColor}
      disabled={disabled}
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
  backgroundColor: Common.colors.point,
  fontColor: Common.colors.primary,
  fontSize: Common.fontSize.base,
};

export default Button;
