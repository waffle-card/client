import Icon from '@mui/material/Icon';
import styled from '@emotion/styled';

const Anchor = styled.a`
  color: inherit;
  text-decoration: none;
`;

const ArrowBack = ({ fontSize, color, href, ...props }) => {
  const iconStyle = {
    fontSize,
    color,
  };

  return (
    <Anchor href={href}>
      <Icon style={{ ...iconStyle }}>arrow_back_ios</Icon>
    </Anchor>
  );
};

export default ArrowBack;
