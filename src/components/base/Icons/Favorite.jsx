import Icon from '@material-ui/core/Icon';
import PropTypes from 'prop-types';
import useToggle from '@hooks/useToggle';

const Favorite = ({ color = 'white', active = false, onClick, ...props }) => {
  const [favorited, toggle] = useToggle(active);

  const handleClick = e => {
    toggle();
    onClick && onClick(e);
  };

  return (
    <Icon
      style={{ fontSize: 'inherit', color, cursor: 'pointer', ...props.style }}
      onClick={handleClick}
      {...props}>
      {favorited ? `star` : `star_border`}
    </Icon>
  );
};

Favorite.propTypes = {
  fontSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  color: PropTypes.string,
  active: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Favorite;
