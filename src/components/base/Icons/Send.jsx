import Icon from '@material-ui/core/Icon';
import PropTypes from 'prop-types';

const Like = ({ color = 'white', onClick, ...props }) => {
  const handleClick = e => {
    onClick && onClick(e);
  };

  return (
    <Icon
      style={{ fontSize: 'inherit', color, cursor: 'pointer', ...props.style }}
      onClick={handleClick}
      {...props}>
      send
    </Icon>
  );
};

Like.propTypes = {
  fontSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  color: PropTypes.string,
  active: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Like;
