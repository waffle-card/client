import Icon from '@material-ui/core/Icon';
import { useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Common from '@styles';

const StyleIcon = styled(Icon)`
  font-size: ${({ fontSize }) =>
    typeof fontSize === 'number' ? `${fontSize}px` : { fontSize }};
  color: ${({ color }) => color};
`;

const Add = ({ fontSize = '24px', color = 'white', onClick, ...props }) => {
  const handleClick = useCallback(
    e => {
      onClick && onClick(e);
    },
    [onClick],
  );

  return (
    <StyleIcon
      fontSize={fontSize}
      color={color}
      style={{ ...props.style }}
      onClick={handleClick}
      {...props}>
      add
    </StyleIcon>
  );
};

Add.propTypes = {
  fontSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  color: PropTypes.string,
  onClick: PropTypes.func,
};

export default Add;
