import Icon from '@mui/material/Icon';
import styled from '@emotion/styled';

const Anchor = styled.a`
  color: inherit;
  text-decoration: none;
`;

const Edit = ({ fontSize, color, href, ...props }) => {
  const iconStyle = {
    fontSize,
    color,
  };

  return (
    <Anchor href={href}>
      <Icon style={{ ...iconStyle }}>edit</Icon>
    </Anchor>
  );
};

export default Edit;
