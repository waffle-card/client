import styled from '@emotion/styled';
import Common from '@styles';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Icons, Text } from '@components';

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
  img {
    width: auto;
    height: 24px;
    @media ${Common.media.sm} {
      height: 18px;
    }
  }
`;

const StyleTextLogin = styled(Text)`
  cursor: pointer;
`;

const Header = ({ backgroundColor = Common.colors.background, ...props }) => {
  const history = useHistory();
  return (
    <HeaderTag backgroundColor={backgroundColor}>
      <Logo
        onClick={() => {
          history.push('/');
          window.location.reload();
        }}>
        <img src={require('./logo.png').default} alt="logo" />
      </Logo>
      <Icons
        onClick={() => {
          history.push('/my-page');
        }}>
        <Icons.Person color={Common.colors.point} />
      </Icons>
      <StyleTextLogin
        color={Common.colors.point}
        size={Common.fontSize.regular}
        weight={Common.fontWeight.regular}
        onClick={() => {
          history.push('/login');
        }}>
        로그인
      </StyleTextLogin>
    </HeaderTag>
  );
};

Header.propTypes = {
  backgroundColor: PropTypes.string,
};

export default Header;