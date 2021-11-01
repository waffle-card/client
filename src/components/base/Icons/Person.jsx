import Icon from '@material-ui/core/Icon';
import PropTypes from 'prop-types';

const Person = ({ color = 'white', ...props }) => {
  return (
    <Icon
      style={{ fontSize: 'inherit', color, cursor: 'pointer', ...props.style }}
      {...props}>
      person
    </Icon>
  );
};

Person.propTypes = {
  fontSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  color: PropTypes.string,
};

export default Person;
