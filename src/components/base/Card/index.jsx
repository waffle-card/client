import React from 'react';
import styled from '@emotion/styled';
import { useCallback } from 'react';
import PropTypes from 'prop-types';
import styles from '@styles';

const CardStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: ${({ width }) =>
    typeof width === 'number' ? `${width - 10}px` : `calc(${width} - 10px)`};
  height: ${({ width, height }) => {
    if (height) {
      return typeof height === 'number'
        ? `${height - 10}px`
        : `calc(${height} - 10px)`;
    } else {
      return typeof width === 'number'
        ? `${(width - 10) * 1.56}px`
        : `calc((${width} - 10px) * 1.56)`;
    }
  }};
  border: ${({ backgroundColor }) =>
    backgroundColor ? undefined : `5px dashed`};
  background-color: ${({ backgroundColor }) =>
    backgroundColor ? backgroundColor : 'transparent'};
  border-radius: 16px;
  margin: 8px;
  padding: ${({ backgroundColor }) => (backgroundColor ? '5px' : undefined)};
  cursor: pointer;
  box-shadow: ${({ backgroundColor }) =>
    backgroundColor ? styles.shadow.card : undefined};
  box-sizing: border-box;
`;

const Card = React.forwardRef(
  ({ children, width, height, backgroundColor, onClick, ...props }, ref) => {
    const handleClick = useCallback(
      e => {
        onClick && onClick(e);
      },
      [onClick],
    );

    return (
      <CardStyle
        width={width}
        height={height}
        backgroundColor={backgroundColor}
        onClick={handleClick}
        ref={ref}
        {...props}>
        {children}
      </CardStyle>
    );
  },
);

Card.propTypes = {
  children: PropTypes.array,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  backgroundColor: PropTypes.string,
  onClick: PropTypes.func,
};

Card.defaultProps = {
  width: 256,
};

export default Card;
