import Icon from '@mui/material/Icon';
import PropTypes from 'prop-types';
import useToggle from '@hooks/useToggle';

const Like = ({
  fontSize = '24px',
  color = 'white',
  active = false,
  onClick,
}) => {
  const iconStyle = {
    fontSize,
    color,
  };

  const [liked, toggle] = useToggle(active);

  const handleClick = e => {
    toggle();
    onClick && onClick();
    console.log('Like Icon Clicked!');
  };

  return (
    <Icon style={{ ...iconStyle }} onClick={handleClick}>
      {liked ? `favorite` : `favorite_border`}
    </Icon>
  );
};

Like.propTypes = {
  fontSize: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  active: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Like;
