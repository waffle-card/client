import Icon from '@material-ui/core/Icon';
import PropTypes from 'prop-types';
import useToggle from '@hooks/useToggle';

const Favorite = ({
  fontSize = '24px',
  color = 'white',
  active = false,
  onClick,
}) => {
  const iconStyle = {
    fontSize,
    color,
  };

  const [favorited, toggle] = useToggle(active);

  const handleClick = e => {
    toggle();
    onClick && onClick(e);
    console.log('Favorite Icon Clicked!');
  };

  return (
    <Icon style={{ ...iconStyle }} onClick={handleClick}>
      {favorited ? `star` : `star_border`}
    </Icon>
  );
};

Favorite.propTypes = {
  fontSize: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  active: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Favorite;
