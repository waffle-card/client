import Icon from '@material-ui/core/Icon';
import PropTypes from 'prop-types';
import useToggle from '@hooks/useToggle';

const Like = ({ color = 'white', active = false, onClick, ...props }) => {
  const [liked, toggle] = useToggle(active);

  const handleClick = e => {
    toggle();
    onClick && onClick(e);
  };

  return (
    <Icon
      style={{ fontSize: 'inherit', color, cursor: 'pointer', ...props.style }}
      onClick={handleClick}
      {...props}>
      {liked ? `favorite` : `favorite_border`}
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
