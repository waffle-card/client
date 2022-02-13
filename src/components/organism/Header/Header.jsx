import React from 'react';
import styled from '@emotion/styled';
import Common from '@styles';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Icons, Text } from '@components';
import { rgba } from 'polished';
// import { useUser } from '@contexts';
import { userState } from '@recoil';
import { useRecoilValue } from 'recoil';

const HeaderTag = styled.header`
  position: fixed;
  width: 100%;
  top: 0;
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

const HelpIcon = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  border-radius: 50px;
  font-size: 14px;
  margin-right: 10px;
  color: rgba(255, 255, 255, 0.8);
  background-color: rgba(255, 255, 255, 0.15);
  cursor: pointer;
  transition: all 150ms ease-out;
  &:hover {
    color: rgba(255, 255, 255, 1);
    background-color: rgba(255, 255, 255, 0.35);
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

const StyledIcon = styled(Icons.Person)`
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

const Header = ({ backgroundColor = Common.colors.background, ...props }) => {
  const userInfo = useRecoilValue(userState);
  const navigate = useNavigate();

  const handleClickHelpIcon = () => {
    console.log('clickHelpIcon');
  };

  return (
    <HeaderTag backgroundColor={backgroundColor} {...props}>
      <Logo
        onClick={() => {
          navigate('/');
        }}>
        <img src={require('./logo.png').default} alt="logo" />
      </Logo>
      <UtilIconBox>
        <HelpIcon onClick={handleClickHelpIcon}>❔</HelpIcon>
        {userInfo ? (
          <StyledIcon
            onClick={() => {
              navigate('/my-page');
            }}
            color={Common.colors.point}
          />
        ) : (
          <StyleTextLogin
            color={Common.colors.point}
            size={Common.fontSize.regular}
            weight={Common.fontWeight.regular}
            onClick={() => {
              navigate('/login');
            }}>
            로그인
          </StyleTextLogin>
        )}
      </UtilIconBox>
    </HeaderTag>
  );
};

Header.propTypes = {
  backgroundColor: PropTypes.string,
};

export default Header;
