import styled from '@emotion/styled';
import Icon from '@mui/material/Icon';

const Anchor = styled.a`
  color: inherit;
  text-decoration: none;
`;

const Delete = ({ fontSize, color, href, ...props }) => {
  const iconStyle = {
    fontSize,
    color,
  };

  return (
    <Anchor href={href}>
      <Icon style={{ ...iconStyle }}>clear</Icon>
    </Anchor>
  );
};

export default Delete;
