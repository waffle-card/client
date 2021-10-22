import Icon from '@mui/material/Icon';
import PropTypes from 'prop-types';
import { useCallback } from 'react';

const Person = ({ fontSize, color }) => {
  const iconStyle = {
    fontSize,
    color,
  };

  const handleClick = useCallback(() => {
    console.log('Person Icon Clicked!');
  }, []);

  return (
    <Icon style={{ ...iconStyle }} onClick={handleClick}>
      person
    </Icon>
  );
};

Person.propTypes = {
  fontSize: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default Person;
