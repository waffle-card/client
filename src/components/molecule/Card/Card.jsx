import React from 'react';
import styled from '@emotion/styled';
import { useCallback } from 'react';
import PropTypes from 'prop-types';
import Common from '@styles';
import Empty from './Empty';

const CardStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 265px;
  min-width: 180px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  border-radius: 16px;
  box-shadow: ${Common.shadow.card};
  box-sizing: border-box;
  cursor: pointer;
  @media ${Common.media.sm} {
    width: 180px;
    height: calc(180px * 1.56);
  }
  @media ${Common.media.md} {
    width: 216px;
    height: calc(216px * 1.56);
  }
  @media ${Common.media.lg} {
    width: 265px;
    height: calc(265px * 1.56);
  }
`;

const Card = React.forwardRef(
  ({ children, backgroundColor, onClick, ...props }, ref) => {
    const handleClick = useCallback(
      e => {
        onClick && onClick(e);
      },
      [onClick],
    );

    return (
      <CardStyle
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
  backgroundColor: PropTypes.string,
  onClick: PropTypes.func,
};

Card.defaultProps = {
  backgroundColor: Common.colors.indigo,
};

Card.Empty = Empty;

export default Card;
