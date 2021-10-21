import styled from '@emotion/styled';
import Icon from '@mui/material/Icon';

const LikeContainer = styled.div`
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

const Like = ({
  width,
  height,
  href,
  color = '#fff',
  active = false,
  ...props
}) => {
  const iconStyle = {
    width,
    height,
    color,
  };

  return (
    <LikeContainer>
      <Anchor href={href}>
        <Icon style={{ ...iconStyle }}>
          {active ? `favorite` : `favorite_border`}
        </Icon>
      </Anchor>
    </LikeContainer>
  );
};

export default Like;
