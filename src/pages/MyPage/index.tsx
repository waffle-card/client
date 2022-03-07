import Swal from 'sweetalert2';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import {
  Text,
  Button,
  BackButton,
  NameEditModal,
  PasswordEditModal,
} from '@/components';
import Common from '@/styles';
import { useUser } from '@/hooks';
import styled from '@emotion/styled';
import { userState } from '@/recoils';
import { useWaffleCardsDispatch } from '@/contexts';

const MyPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userState);
  const { logout, updateUser } = useUser();
  const [nameModalVisible, setNameModalVisible] = useState(false);
  const [passWordModalVisible, setPassWordModalVisible] = useState(false);
  const { refreshWaffleCards } = useWaffleCardsDispatch();

  const handleClickEditNameButton = () => {
    setNameModalVisible(true);
  };

  const handleClickEditPasswordButton = () => {
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

  const handleSubmitEditName = async ({
    userName,
  }: {
    [key: string]: string;
  }) => {
    try {
      if (!user) return;
      await updateUser({ name: userName });
      setUser({ ...user, name: userName });
      Swal.fire({
        title: '😎',
        text: '닉네임 변경완료!',
        confirmButtonColor: Common.colors.point,
      }).then(() => {
        setNameModalVisible(false);
      });
    } catch (error: any) {
      Swal.fire({
        title: '🥲',
        text:
          error.message ?? '알수 없는 오류가 발생했습니다. 다시 시도해주세요',
        confirmButtonColor: Common.colors.point,
      });
    }
  };

  const handleSubmitEditPassword = async ({
    newPassword,
  }: {
    [key: string]: string;
  }) => {
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
    } catch (error: any) {
      Swal.fire({
        title: '🥲',
        text:
          error.message ?? '알수 없는 오류가 발생했습니다. 다시 시도해주세요',
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
          <StyledButton type="button" onClick={handleClickEditNameButton}>
            닉네임 변경
          </StyledButton>
          <StyledButton type="button" onClick={handleClickEditPasswordButton}>
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
      <NameEditModal
        userName={user?.name}
        visible={nameModalVisible}
        onSubmit={handleSubmitEditName}
        onClose={() => {
          setNameModalVisible(false);
        }}
      />
      <PasswordEditModal
        visible={passWordModalVisible}
        onSubmit={handleSubmitEditPassword}
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
