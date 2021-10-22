import Icon from '@mui/material/Icon';
import PropTypes from 'prop-types';
import { useCallback } from 'react';

const Favorite = ({ fontSize, color, active = false }) => {
  const iconStyle = {
    fontSize,
    color,
  };

  const handleClick = useCallback(() => {
    console.log('Favorite Icon Clicked!');
  }, []);

  return (
    <Icon style={{ ...iconStyle }} onClick={handleClick}>
      {active ? `star_rate` : `star_border`}
    </Icon>
  );
};

Favorite.propTypes = {
  fontSize: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  active: PropTypes.bool,
};

export default Favorite;
