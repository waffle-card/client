import styled from '@emotion/styled';
import Common from '@styles';
import { Link } from 'react-router-dom';

import Icons from '@components/base/Icons';
import Text from '@components/base/Text';

const HeaderTag = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 55px;
`;

const Logo = styled.h1`
  margin: 0;
  font-size: 0;
  a {
    display: block;
    img {
      width: auto;
      height: 24px;
      @media ${Common.media.sm} {
        height: 18px;
      }
    }
  }
`;

const StyledIconPerson = styled(Icons.Person)`
  cursor: pointer;
  @media ${Common.media.sm} {
    font-size: 18px;
  }
`;

const StyleTextLogin = styled(Text)`
  cursor: pointer;
`;

const Header = () => {
  return (
    <HeaderTag>
      <Logo>
        <Link to="/">
          <img src={require('./logo.png').default} alt="logo" />
        </Link>
      </Logo>
      <Link to="/my-page">
        <StyledIconPerson color={Common.colors.point} />
      </Link>
      <Link to="/login">
        <StyleTextLogin
          color={Common.colors.point}
          size={Common.fontSize.regular}
          weight={Common.fontWeight.regular}>
          로그인
        </StyleTextLogin>
      </Link>
    </HeaderTag>
  );
};

export default Header;
