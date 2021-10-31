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
  validatePasswordEmpty,
  validatePasswordLength,
  validatePasswordConfirm,
} from '@validators';

const StyledBackButton = styled(BackButton)`
  position: relative;
  top: 32px;
  left: 32px;
  @media ${Common.media.sm} {
    left: 16px;
  }
`;

const Container = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  width: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ContentContainer = styled.form`
  width: 100%;
  max-width: 550px;
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
      name: '',
      password: '',
      passwordConfirm: '',
    },
    onSubmit: async values => {
      alert(JSON.stringify(values));
    },
    validate: ({ email, name, password, passwordConfirm }) => {
      const errors = {};

      if (!validateEmailForm(email)) {
        errors.email = '올바른 이메일을 입력해주세요.';
      }
      if (!validateEmailEmpty(email)) errors.email = '이메일을 입력해주세요.';
      if (!validateNameEmpty(name)) errors.name = '이름을 입력해주세요.';
      if (!validatePasswordLength(password)) {
        errors.password = '비밀번호를 8자 이상 작성해주세요.';
      }
      if (!validatePasswordEmpty(password)) {
        errors.password = '비밀번호를 입력해주세요';
      }
      if (!validatePasswordConfirm(password, passwordConfirm)) {
        errors.passwordConfirm = '비밀번호가 일치하는지 확인해주세요.';
      }

      return errors;
    },
  });

  const handleClickSignUpButton = () => {
    history.push('/signup');
  };

  return (
    <>
      <StyledBackButton />
      <Container>
        <ContentContainer onSubmit={handleSubmit}>
          <Header size={Common.fontSize.large}>
            회원가입하고 와플카드 만들러가요!
          </Header>
          <StyledText>이메일</StyledText>
          <Input name="email" type="email" onChange={handleChange} />
          <StyledText color="red">{errors.email}&nbsp;</StyledText>
          <StyledText>이름(닉네임)</StyledText>
          <Input name="name" type="name" onChange={handleChange} />
          <StyledText color="red">{errors.name}&nbsp;</StyledText>
          <StyledText>비밀번호</StyledText>
          <Input name="password" type="password" onChange={handleChange} />
          <StyledText color="red">{errors.password}&nbsp;</StyledText>
          <StyledText>비밀번호 확인</StyledText>
          <Input
            name="passwordConfirm"
            type="password"
            onChange={handleChange}
          />
          <StyledText color="red">{errors.passwordConfirm}&nbsp;</StyledText>
          <StyledButton type="submit" onClick={handleClickSignUpButton}>
            가입하기
          </StyledButton>
        </ContentContainer>
        <Spinner loading={isLoading} />
      </Container>
    </>
  );
};

export default SignUpPage;
