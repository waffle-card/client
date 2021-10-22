import Icon from '@mui/material/Icon';

const Add = ({ fontSize, color, href, ...props }) => {
  const iconStyle = {
    fontSize,
    color,
  };

  return <Icon style={{ ...iconStyle }}>add</Icon>;
};

export default Add;
