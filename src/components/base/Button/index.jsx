import styled from '@emotion/styled';
import { useCallback } from 'react';
import PropTypes from 'prop-types';

const StyledButton = styled.button`
  box-sizing: border-box;
  display: block;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  padding: 8px 6px;
  font-size: ${({ fontsize }) => fontsize}px;
  color: ${({ fontcolor }) => fontcolor};
  cursor: pointer;
  background-color: ${({ backgroundcolor }) => backgroundcolor};
  border: none;
  border-radius: 16px;
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
  ...props
}) => {
  const handleClick = useCallback(() => {
    onClick && onClick();
  }, [onClick]);

  return (
    <StyledButton
      {...props}
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
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  fontColor: PropTypes.string.isRequired,
  fontSize: PropTypes.number.isRequired,
  onClick: PropTypes.func,
};

export default Button;
