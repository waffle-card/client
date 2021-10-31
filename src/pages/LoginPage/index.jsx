import React from 'react';
import Common from '@styles';
import styled from '@emotion/styled';
import { useForm } from '@hooks';
import { useHistory } from 'react-router-dom';
import { Text, Button, Input, BackButton, Spinner } from '@components';
import {
  validateEmailEmpty,
  validateEmailForm,
  validatePasswordEmpty,
  validatePasswordLength,
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
  margin: 16px 0;
  &:nth-of-type(1) {
    margin-top: 32px;
  }
`;

const StyledText = styled(Text)`
  margin: 16px 0;
`;
const LoginPage = ({ ...prop }) => {
  const history = useHistory();
  const { isLoading, errors, handleChange, handleSubmit } = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async values => {
      alert(JSON.stringify(values));
    },
    validate: ({ email, password }) => {
      const errors = {};

      if (!validateEmailForm(email)) {
        errors.email = '올바른 이메일을 입력해주세요.';
      }
      if (!validateEmailEmpty(email)) errors.email = '이메일을 입력해주세요';
      if (!validatePasswordLength(password)) {
        errors.password = '비밀번호를 8자 이상 작성해주세요.';
      }
      if (!validatePasswordEmpty(password)) {
        errors.password = '비밀번호를 입력해주세요';
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
            와플카드 대화에 참여해보시겠어요?
          </Header>
          <StyledText>이메일</StyledText>
          <Input name="email" type="email" onChange={handleChange} />
          <StyledText color="red">{errors.email}&nbsp;</StyledText>
          <StyledText>비밀번호</StyledText>
          <Input name="password" type="password" onChange={handleChange} />
          <StyledText color="red">{errors.password}&nbsp;</StyledText>
          <StyledButton type="submit">입장하기</StyledButton>
          <StyledButton
            type="button"
            onClick={handleClickSignUpButton}
            backgroundColor="white"
            fontColor={Common.colors.point}>
            가입하기
          </StyledButton>
        </ContentContainer>
        <Spinner loading={isLoading} />
      </Container>
    </>
  );
};

export default LoginPage;
