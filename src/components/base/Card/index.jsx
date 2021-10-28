import React from 'react';
import styled from '@emotion/styled';
import { useCallback } from 'react';
import PropTypes from 'prop-types';
import styles from '@styles';
import Empty from './Empty';

const CardStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: ${({ width }) =>
    typeof width === 'number' ? `${width - 10}px` : `calc(${width} - 10px)`};
  min-width: 134px;
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
  border-radius: 16px;
  margin: 8px;
  padding: 5px;
  cursor: pointer;
  box-shadow: ${styles.shadow.card};
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
  backgroundColor: styles.colors.indigo,
};

Card.Empty = Empty;

export default Card;
