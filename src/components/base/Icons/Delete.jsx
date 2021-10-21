import styled from '@emotion/styled';
import Icon from '@mui/material/Icon';

const DeleteContainer = styled.div`
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

const Delete = ({ width, height, href, color = '#fff', ...props }) => {
  const iconStyle = {
    width,
    height,
    color,
  };

  return (
    <DeleteContainer>
      <Anchor href={href}>
        <Icon style={{ ...iconStyle }}>clear</Icon>
      </Anchor>
    </DeleteContainer>
  );
};

export default Delete;
