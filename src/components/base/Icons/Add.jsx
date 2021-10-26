import Icon from '@material-ui/core/Icon';
import { useCallback } from 'react';
import PropTypes from 'prop-types';

const Add = ({ fontSize = '24px', color = 'white', onClick }) => {
  const iconStyle = {
    fontSize,
    color,
  };

  const handleClick = useCallback(() => {
    console.log('Add Icon Clicked!');
    onClick && onClick();
  }, [onClick]);

  return (
    <Icon style={{ ...iconStyle }} onClick={handleClick}>
      add
    </Icon>
  );
};

Add.propTypes = {
  fontSize: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default Add;
