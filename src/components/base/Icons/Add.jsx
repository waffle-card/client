import Icon from '@mui/material/Icon';
import { useCallback } from 'react';
import PropTypes from 'prop-types';

const Add = ({ fontSize, color, onClick }) => {
  const iconStyle = {
    fontSize,
    color,
  };

  const handleClick = useCallback(() => {
    console.log('Add Icon Clicked!');
  }, []);

  return (
    <Icon style={{ ...iconStyle }} onClick={handleClick}>
      add
    </Icon>
  );
};

Add.propTypes = {
  fontSize: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default Add;
