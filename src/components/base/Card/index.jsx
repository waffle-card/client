import styled from '@emotion/styled';
import { useCallback } from 'react';
import PropTypes from 'prop-types';

const CardStyle = styled.div`
  display: flex;
<<<<<<< HEAD
=======
  flex-direction: column;
>>>>>>> 96d6fa1f7eab394790d02f0075e7ceb89d4550be
  justify-content: center;
  align-items: center;
  width: ${({ width }) =>
    typeof width === 'number' ? `${width - 10}px` : `calc(${width} - 10px)`};
  height: ${({ height }) =>
    typeof height === 'number' ? `${height - 10}px` : `calc(${height} - 10px)`};
  border: ${({ backgroundColor }) =>
    backgroundColor ? undefined : `5px dashed`};
  background-color: ${({ backgroundColor }) =>
    backgroundColor ? backgroundColor : 'transparent'};
  border-radius: 16px;
  margin: 8px;
  padding: ${({ backgroundColor }) => (backgroundColor ? '5px' : undefined)};
  cursor: pointer;
  border-color: ${({ borderColor }) => borderColor};
`;

const Card = ({
  children,
<<<<<<< HEAD
  width,
  height,
=======
  width = 265,
  height = 400,
>>>>>>> 96d6fa1f7eab394790d02f0075e7ceb89d4550be
  backgroundColor,
  borderColor,
  href,
  onClick,
  ...props
}) => {
  const handleClick = useCallback(() => {
    console.log('Clicked!');
<<<<<<< HEAD
  }, []);
=======
    onClick && onClick();
  }, [onClick]);
>>>>>>> 96d6fa1f7eab394790d02f0075e7ceb89d4550be

  return (
    <CardStyle
      width={width}
      height={height}
      borderColor={borderColor}
      backgroundColor={backgroundColor}
      onClick={handleClick}>
      {children}
    </CardStyle>
  );
};

Card.propTypes = {
  children: PropTypes.object,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  backgroundColor: PropTypes.string,
  borderColor: PropTypes.string,
  href: PropTypes.string,
  onClick: PropTypes.func,
};

export default Card;
