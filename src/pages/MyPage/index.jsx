import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import {
  Text,
  Button,
  BackButton,
  NameChangeModal,
  PasswordChangeModal,
} from '@/components';
import Common from '@/styles';
import Swal from 'sweetalert2';
import { useUser } from '@/hooks';
import { userState } from '@/recoils';
import { useRecoilState } from 'recoil';
import { useWaffleCardsDispatch } from '@/contexts';

const MyPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userState);
  const { logout, updateUser } = useUser();
  const [nameModalVisible, setNameModalVisible] = useState(false);
  const [passWordModalVisible, setPassWordModalVisible] = useState(false);
  const { refreshWaffleCards } = useWaffleCardsDispatch();

  const handleClickChangeNameButton = () => {
    setNameModalVisible(true);
  };

  const handleClickChangePasswordButton = () => {
    setPassWordModalVisible(true);
  };

  const handleClickLogoutButton = () => {
    Swal.fire({
      title: '🤔',
      text: '정말 로그아웃 하시겠습니까?',
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonColor: Common.colors.point,
      cancelButtonColor: 'red',
    }).then(res => {
      if (res.isConfirmed) {
        Swal.fire({
          title: '👋🏻',
          text: '로그아웃되었습니다.',
          confirmButtonColor: Common.colors.point,
        }).then(() => {
          refreshWaffleCards();
          navigate('/', { replace: true });
          logout();
        });
      }
    });
  };

  const handleSubmitChangedName = async ({ userName }) => {
    try {
      await updateUser({ name: userName });
      setUser({ ...user, name: userName });
      Swal.fire({
        title: '😎',
        text: '닉네임 변경완료!',
        confirmButtonColor: Common.colors.point,
      }).then(() => {
        navigate('/my-page', { replace: true });
      });
    } catch (error) {
      Swal.fire({
        title: '🥲',
        text: error.data,
        confirmButtonColor: Common.colors.point,
      });
    }
  };

  const handleSubmitChangedPassword = async ({ newPassword }) => {
    try {
      await updateUser({ password: newPassword });
      Swal.fire({
        title: '😎',
        text: '비밀번호 변경완료! 다시 로그인해주세요!',
        confirmButtonColor: Common.colors.point,
      }).then(() => {
        logout();
        navigate('/login');
      });
    } catch (error) {
      Swal.fire({
        title: '🥲',
        text: error,
        confirmButtonColor: Common.colors.point,
      });
    }
  };

  return (
    <Container>
      <StyledBackButton />
      <ContentContainer>
        <Text size={Common.fontSize.large}>마이페이지</Text>
        <TextContainer>
          <InfoBox>
            <Text>이메일</Text>
            <Text size={Common.fontSize.large}>{user?.email}&nbsp;</Text>
          </InfoBox>
          <InfoBox>
            <Text>이름(닉네임)</Text>
            <Text size={Common.fontSize.large}>{user?.name}&nbsp;</Text>
          </InfoBox>
        </TextContainer>
        <ButtonContainer>
          <StyledButton type="button" onClick={handleClickChangeNameButton}>
            닉네임 변경
          </StyledButton>
          <StyledButton type="button" onClick={handleClickChangePasswordButton}>
            비밀번호 변경
          </StyledButton>
          <StyledButton
            type="button"
            onClick={handleClickLogoutButton}
            fontColor={Common.colors.button_font_dark}
            backgroundColor={Common.colors.primary}
          >
            로그아웃
          </StyledButton>
        </ButtonContainer>
      </ContentContainer>
      <NameChangeModal
        userName={user?.name}
        visible={nameModalVisible}
        onSubmit={handleSubmitChangedName}
        onClose={() => {
          setNameModalVisible(false);
        }}
      />
      <PasswordChangeModal
        visible={passWordModalVisible}
        onSubmit={handleSubmitChangedPassword}
        onClose={() => {
          setPassWordModalVisible(false);
        }}
      />
    </Container>
  );
};

const StyledBackButton = styled(BackButton)`
  position: fixed;
  top: 60px;
  left: 50px;
  @media ${Common.media.sm} {
    left: 16px;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 110px);
  padding: 100px 0;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 550px;
  margin: 0 auto;
  @media ${Common.media.sm} {
    padding: 0 16px;
  }
`;

const TextContainer = styled.div`
  width: 100%;
  margin: 96px 0 22px 0;
`;

const InfoBox = styled.div`
  margin-bottom: 52px;
  p:first-of-type {
    margin-bottom: 20px;
  }
`;

const ButtonContainer = styled.div`
  width: 100%;
`;

const StyledButton = styled(Button)`
  width: 100%;
  font-weight: ${Common.fontWeight.bold};
  margin-bottom: 16px;
  &:last-child {
    margin-bottom: 0;
  }
  @media ${Common.media.sm} {
    height: 40px;
    border-radius: 12px;
    font-size: ${Common.fontSize.small};
    &:first-of-type {
      margin-bottom: 16px;
    }
  }
`;

export default MyPage;
