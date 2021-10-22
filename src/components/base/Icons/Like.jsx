import Icon from '@mui/material/Icon';
import PropTypes from 'prop-types';
import { useCallback } from 'react';

const Like = ({ fontSize, color, active = false }) => {
  const iconStyle = {
    fontSize,
    color,
  };

  const handleClick = useCallback(() => {
    console.log('Like Icon Clicked!');
  }, []);

  return (
    <Icon style={{ ...iconStyle }} onClick={handleClick}>
      {active ? `favorite` : `favorite_border`}
    </Icon>
  );
};

Like.propTypes = {
  fontSize: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  active: PropTypes.bool,
};

export default Like;
