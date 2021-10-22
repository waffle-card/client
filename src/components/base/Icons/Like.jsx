import Icon from '@mui/material/Icon';

const Like = ({ fontSize, href, color, active = false, ...props }) => {
  const iconStyle = {
    fontSize,
    color,
  };

  return (
    <Icon style={{ ...iconStyle }}>
      {active ? `favorite` : `favorite_border`}
    </Icon>
  );
};

export default Like;
