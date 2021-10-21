import Icon from '@mui/material/Icon';
import styled from '@emotion/styled';

const ArrowBackContainer = styled.div`
  display: inline-block;
  cursor: pointer;
  background-color: gray;

  &:hover {
    background-color: none;
  }
`;

const Anchor = styled.a`
  color: inherit;
  text-decoration: none;
`;

const ArrowBack = (width = 25, height = 25, color = '#fff', href, ...props) => {
  const iconStyle = {
    color,
    width,
    height,
  };

  return (
    <ArrowBackContainer>
      <Anchor href={href}>
        <Icon style={{ ...iconStyle }}>arrow_back_ios</Icon>
      </Anchor>
    </ArrowBackContainer>
  );
};

export default ArrowBack;
