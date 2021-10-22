import Icon from '@mui/material/Icon';

const Favorite = ({ fontSize, color, href, active = false, ...props }) => {
  const iconStyle = {
    fontSize,
    color,
  };

  return (
    <Icon style={{ ...iconStyle }}>{active ? `star_rate` : `star_border`}</Icon>
  );
};

export default Favorite;
