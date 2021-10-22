import Icon from '@mui/material/Icon';

const Person = ({ fontSize, href, color, ...props }) => {
  const iconStyle = {
    fontSize,
    color,
  };

  return <Icon style={{ ...iconStyle }}>person</Icon>;
};

export default Person;
