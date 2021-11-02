import styled from '@emotion/styled';
import Common from '@styles';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Icons from '@components/base/Icons';
import Text from '@components/base/Text';

const HeaderTag = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  padding: 0 50px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  @media ${Common.media.sm} {
    padding: 0 16px;
  }
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

const StyleTextLogin = styled(Text)`
  cursor: pointer;
`;

const reloadPage = () => {
  window.location.reload();
};

const Header = ({ backgroundColor = Common.colors.background, ...props }) => {
  return (
    <HeaderTag backgroundColor={backgroundColor}>
      <Logo onClick={reloadPage}>
        <Link to="/">
          <img src={require('./logo.png').default} alt="logo" />
        </Link>
      </Logo>
      <Link to="/my-page">
        <Icons>
          <Icons.Person color={Common.colors.point} />
        </Icons>
      </Link>
      {/* <Link to="/login">
        <StyleTextLogin
          color={Common.colors.point}
          size={Common.fontSize.regular}
          weight={Common.fontWeight.regular}>
          로그인
        </StyleTextLogin>
      </Link> */}
    </HeaderTag>
  );
};

Header.propTypes = {
  backgroundColor: PropTypes.string,
};

export default Header;
