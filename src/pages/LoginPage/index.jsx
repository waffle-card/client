import React from 'react';
import Common from '@styles';
import styled from '@emotion/styled';
import Swal from 'sweetalert2';
import { useForm } from '@hooks';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@hooks';
import { Text, Button, Input, BackButton, Spinner } from '@components';
import {
  validateEmailEmpty,
  validateEmailForm,
  validatePasswordEmpty,
  validatePasswordLength,
} from '@validators';

const LoginPage = () => {
  const { login } = useUser();
  const navigate = useNavigate();
  const { isLoading, errors, handleChange, handleSubmit } = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async ({ email, password }) => {
      try {
        await login(email, password);

        Swal.fire({
          title: '🥳',
          text: '로그인 되었습니다!',
          confirmButtonColor: Common.colors.point,
        }).then(() => {
          navigate('/', { replace: true });
        });
      } catch (error) {
        Swal.fire({
          title: '🥲',
          text: error.message,
          confirmButtonColor: Common.colors.point,
        });
      }
    },
    validate: ({ email, password }) => {
      const errors = {};

      if (!validateEmailForm(email)) {
        errors.email = '올바른 이메일을 입력해주세요.';
      }
      if (!validateEmailEmpty(email)) errors.email = '이메일을 입력해주세요.';
      if (!validatePasswordLength(password)) {
        errors.password = '비밀번호를 8자 이상 작성해주세요.';
      }
      if (!validatePasswordEmpty(password)) {
        errors.password = '비밀번호를 입력해주세요.';
      }

      return errors;
    },
  });

  const handleClickSignUpButton = () => {
    navigate('/signup');
  };

  return (
    <Container>
      <StyledBackButton />
      <ContentContainer onSubmit={handleSubmit}>
        <Header size={Common.fontSize.large}>
          와플카드 대화에 참여해보시겠어요?
        </Header>
        <InputWrapper>
          <StyledText>이메일</StyledText>
          <Input name="email" type="email" onChange={handleChange} />
          <StyledText color="red">{errors.email}&nbsp;</StyledText>
          <StyledText>비밀번호</StyledText>
          <Input name="password" type="password" onChange={handleChange} />
          <StyledText color="red">{errors.password}&nbsp;</StyledText>
        </InputWrapper>
        <StyledButton type="submit">입장하기</StyledButton>
        <StyledButton
          type="button"
          onClick={handleClickSignUpButton}
          backgroundColor="white"
          fontColor={Common.colors.button_font_dark}>
          가입하기
        </StyledButton>
      </ContentContainer>
      <Spinner loading={isLoading} />
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
  @media ${Common.media.sm} {
    height: calc(100vh - 60px);
  }
`;

const ContentContainer = styled.form`
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

const InputWrapper = styled.div`
  width: 100%;
`;

const Header = styled(Text)`
  text-align: center;
  margin-bottom: 64px;
  @media ${Common.media.sm} {
    font-size: 18px;
    margin-bottom: 20px;
  }
`;

const StyledButton = styled(Button)`
  width: 100%;
  margin: 16px 0;
  font-weight: ${Common.fontWeight.bold};
  &:nth-of-type(1) {
    margin-top: 32px;
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

const StyledText = styled(Text)`
  margin: 16px 0;
`;

export default LoginPage;
