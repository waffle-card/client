import styled from '@emotion/styled';
import Icon from '@mui/material/Icon';

const PersonContainer = styled.div`
  display: inline-block;
  cursor: pointer;
  background-color: gray;

  &:hover {
    background-color: none;
  }
`;

const Person = ({ width, height, href, color = '#fff', ...props }) => {
  const iconStyle = {
    width,
    height,
    color,
  };

  return (
    <PersonContainer>
      <Icon style={{ ...iconStyle }}>person</Icon>
    </PersonContainer>
  );
};

export default Person;
