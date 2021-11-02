import React from 'react';
import Common from '@styles';
import styled from '@emotion/styled';
import { useForm } from '@hooks';
import { useHistory } from 'react-router-dom';
import { Text, Button, Input, BackButton, Spinner } from '@components';
import {
  validateEmailEmpty,
  validateEmailForm,
  validateNameEmpty,
  validateNameLength,
  validatePasswordEmpty,
  validatePasswordLength,
  validatePasswordConfirm,
} from '@validators';
import { authApi } from '@apis';
import Swal from 'sweetalert2';

const StyledBackButton = styled(BackButton)`
  margin: 0 0 32px 50px;
  @media ${Common.media.sm} {
    margin-left: 16px;
  }
`;

const Container = styled.div`
  padding: 40px 0;
  @media ${Common.media.sm} {
    padding: 20px 0;
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
`;

const StyledButton = styled(Button)`
  width: 100%;
  margin: 64px 0;
`;

const StyledText = styled(Text)`
  margin: 16px 0;
`;

const SignUpPage = ({ ...prop }) => {
  const history = useHistory();
  const { isLoading, errors, handleChange, handleSubmit } = useForm({
    initialValues: {
      email: '',
      userName: '',
      password: '',
      passwordConfirm: '',
    },
    onSubmit: async ({ email, userName, password }) => {
      try {
        await authApi.signUp({
          email,
          fullName: userName,
          password,
        });
        Swal.fire({
          title: '🎉',
          text: '환영합니다! 이제 로그인을 해주세요!',
          confirmButtonColor: Common.colors.point,
        }).then(() => {
          history.push('/login');
        });
      } catch (error) {
        Swal.fire({
          title: '🥲',
          text: error.data,
          confirmButtonColor: Common.colors.point,
        });
      }
    },
    validate: ({ email, userName, password, passwordConfirm }) => {
      const errors = {};
      if (!validateEmailForm(email)) {
        errors.email = '올바른 이메일을 입력해주세요.';
      }
      if (!validateEmailEmpty(email)) errors.email = '이메일을 입력해주세요.';
      if (!validateNameEmpty(userName))
        errors.userName = '이름을 입력해주세요.';
      if (!validateNameLength(userName))
        errors.userName = '이름을 10글자 이내로 작성해주세요.';
      if (!validatePasswordLength(password)) {
        errors.password = '비밀번호를 8자 이상 작성해주세요.';
      }
      if (!validatePasswordEmpty(password)) {
        errors.password = '비밀번호를 입력해주세요.';
      }
      if (!validatePasswordConfirm(password, passwordConfirm)) {
        errors.passwordConfirm = '비밀번호가 일치하는지 확인해주세요.';
      }

      return errors;
    },
  });

  return (
    <Container>
      <StyledBackButton />
      <ContentContainer onSubmit={handleSubmit}>
        <Header size={Common.fontSize.large}>
          회원가입하고 와플카드 만들러가요!
        </Header>
        <InputWrapper>
          <StyledText>이메일</StyledText>
          <Input name="email" type="email" onChange={handleChange} />
          <StyledText color="red">{errors.email}&nbsp;</StyledText>
          <StyledText>이름(닉네임)</StyledText>
          <Input name="userName" type="text" onChange={handleChange} />
          <StyledText color="red">{errors.userName}&nbsp;</StyledText>
          <StyledText>비밀번호</StyledText>
          <Input name="password" type="password" onChange={handleChange} />
          <StyledText color="red">{errors.password}&nbsp;</StyledText>
          <StyledText>비밀번호 확인</StyledText>
          <Input
            name="passwordConfirm"
            type="password"
            onChange={handleChange}
          />
        </InputWrapper>
        <StyledText color="red">{errors.passwordConfirm}&nbsp;</StyledText>
        <StyledButton type="submit">가입하기</StyledButton>
      </ContentContainer>
      <Spinner loading={isLoading} />
    </Container>
  );
};

export default SignUpPage;