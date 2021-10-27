import Icon from '@material-ui/core/Icon';
import { useCallback } from 'react';
import PropTypes from 'prop-types';

const Add = ({ fontSize = '24px', color = 'white', onClick, ...props }) => {
  const iconStyle = {
    fontSize,
    color,
  };

  const handleClick = useCallback(
    e => {
      onClick && onClick(e);
    },
    [onClick],
  );

  return (
    <Icon
      style={{ ...iconStyle, ...props.style }}
      onClick={handleClick}
      {...props}>
      add
    </Icon>
  );
};

Add.propTypes = {
  fontSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  color: PropTypes.string,
  onClick: PropTypes.func,
};

export default Add;
