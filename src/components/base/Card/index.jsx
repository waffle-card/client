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
  height: ${({ width }) =>
    typeof width === 'number'
      ? `${(width - 10) * 1.56}px`
      : `calc((${width} - 10px) * 1.56)`};
  border: ${({ backgroundColor }) =>
    backgroundColor ? undefined : `5px dashed`};
  background-color: ${({ backgroundColor }) =>
    backgroundColor ? backgroundColor : 'transparent'};
  border-radius: 16px;
  margin: 8px;
  padding: ${({ backgroundColor }) => (backgroundColor ? '5px' : undefined)};
  cursor: pointer;
  border-color: ${({ borderColor }) => borderColor};
  box-shadow: ${({ backgroundColor }) =>
    backgroundColor ? styles.shadow.card : undefined};
`;

const Card = ({
  children,
  width = 265,
  backgroundColor,
  borderColor,
  href,
  onClick,
  ...props
}) => {
  const handleClick = useCallback(() => {
    console.log('Clicked!');
    onClick && onClick();
  }, [onClick]);

  return (
    <CardStyle
      width={width}
      borderColor={borderColor}
      backgroundColor={backgroundColor}
      onClick={handleClick}>
      {children}
    </CardStyle>
  );
};

Card.propTypes = {
  children: PropTypes.array,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  backgroundColor: PropTypes.string,
  borderColor: PropTypes.string,
  href: PropTypes.string,
  onClick: PropTypes.func,
};

export default Card;
