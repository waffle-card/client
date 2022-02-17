import React from 'react';
import styled from '@emotion/styled';
import Common from '@/styles';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Text } from '@/components';
import { rgba } from 'polished';
import { userState } from '@/recoils';
import { useRecoilValue } from 'recoil';
import { logo } from '@/images';
import HelpIcon from '@mui/icons-material/Help';
import PersonIcon from '@mui/icons-material/Person';

const Header = ({ ...props }): JSX.Element => {
  const userInfo = useRecoilValue(userState);
  const navigate = useNavigate();

  return (
    <HeaderTag {...props}>
      <Logo
        onClick={() => {
          navigate('/');
        }}
      >
        <img src={logo} alt="logo" />
      </Logo>
      <UtilIconBox>
        <StyledHelpIcon
          onClick={() => {
            navigate('/guide');
          }}
        />
        {userInfo ? (
          <StyledPersonIcon
            onClick={() => {
              navigate('/my-page');
            }}
          />
        ) : (
          <StyleTextLogin
            onClick={() => {
              navigate('/login');
            }}
          >
            로그인
          </StyleTextLogin>
        )}
      </UtilIconBox>
    </HeaderTag>
  );
};

const HeaderTag = styled.header`
  position: fixed;
  width: 100%;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  padding: 0 50px;
  background-color: ${Common.colors.background};
  @media ${Common.media.sm} {
    padding: 0 16px;
  }
`;

const Logo = styled.h1`
  margin: 0;
  font-size: 0;
  cursor: pointer;
  img {
    width: auto;
    height: 30px;
    @media ${Common.media.sm} {
      height: 24px;
    }
  }
`;

const UtilIconBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledHelpIcon = styled(HelpIcon)`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.7rem;
  border-radius: 50px;
  margin-right: 12px;
  color: rgba(255, 255, 255, 0.4);
  cursor: pointer;
  transition: all 150ms ease-out;
  &:hover {
    color: rgba(255, 255, 255, 0.8);
  }
  @media ${Common.media.sm} {
    margin-right: 8px;
  }
`;

const StyleTextLogin = styled(Text)`
  cursor: pointer;
  transition: color 0.2s ease-out;
  &:hover {
    color: ${rgba(Common.colors.point, 0.7)};
  }
`;

const StyledPersonIcon = styled(PersonIcon)`
  color: ${Common.colors.point};
  font-size: 20px;
  transition: color 0.2s ease-out;
  @media ${Common.media.sm} {
    font-size: 20px;
  }
  @media ${Common.media.md} {
    font-size: 20px;
  }
  &:hover {
    color: ${rgba(Common.colors.point, 0.7)};
  }
`;

Header.propTypes = {
  backgroundColor: PropTypes.string,
};

export default Header;
