import Icon from '@mui/material/Icon';
import styled from '@emotion/styled';

const EditContainer = styled.div`
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

const Edit = ({ width = 25, height = 25, color = '#fff', href, ...props }) => {
  const iconStyle = {
    width,
    height,
    color,
  };

  return (
    <EditContainer>
      <Anchor href={href}>
        <Icon style={{ ...iconStyle }}>edit</Icon>
      </Anchor>
    </EditContainer>
  );
};

export default Edit;
