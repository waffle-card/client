import Icon from '@material-ui/core/Icon';
import PropTypes from 'prop-types';

const Person = ({ fontSize = '24px', color = 'white' }) => {
  const iconStyle = {
    fontSize,
    color,
    cursor: 'default',
  };

  return <Icon style={{ ...iconStyle }}>person</Icon>;
};

Person.propTypes = {
  fontSize: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default Person;
