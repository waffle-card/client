import Icon from '@material-ui/core/Icon';
import PropTypes from 'prop-types';

const Person = ({ fontSize = '24px', color = 'white', ...props }) => {
  const iconStyle = {
    fontSize,
    color,
    cursor: 'default',
  };

  return (
    <Icon style={{ ...iconStyle, ...props.style }} {...props}>
      person
    </Icon>
  );
};

Person.propTypes = {
  fontSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  color: PropTypes.string,
};

export default Person;
