import styled from '@emotion/styled';
import Icon from '@mui/material/Icon';

const FavoriteContainer = styled.div`
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

const Favorite = ({
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
    <FavoriteContainer>
      <Anchor href={href}>
        <Icon style={{ ...iconStyle }}>
          {active ? `star_rate` : `star_border`}
        </Icon>
      </Anchor>
    </FavoriteContainer>
  );
};

export default Favorite;
