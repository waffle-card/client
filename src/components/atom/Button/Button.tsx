import styled from '@emotion/styled';
// import PropTypes from 'prop-types';
import Common from '@/styles';

interface ButtonProps extends React.ComponentProps<'button'> {
  children: React.ReactNode;
  width: string | number;
  height: string | number;
  backgroundColor: string;
  fontColor: string;
  fontSize: string | number;
  disabled: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const Button = styled.button<ButtonProps>`
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

Button.defaultProps = {
  width: 550,
  height: 56,
  backgroundColor: Common.colors.point,
  fontColor: Common.colors.primary,
  fontSize: Common.fontSize.base,
};

export default Button;
