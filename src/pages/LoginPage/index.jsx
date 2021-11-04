import React, { useEffect, useState } from 'react';
import Common from '@styles';
import styled from '@emotion/styled';
import Swal from 'sweetalert2';
import { useForm } from '@hooks';
import { useHistory } from 'react-router-dom';
import { useUser } from '@contexts';
import { authApi } from '@apis';
import { getUserInfoByToken } from '@utils';
import { Text, Button, Input, BackButton, Spinner } from '@components';
import {
  validateEmailEmpty,
  validateEmailForm,
  validatePasswordEmpty,
  validatePasswordLength,
} from '@validators';

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
  margin: 16px 0;
  font-weight: ${Common.fontWeight.bold};
  &:nth-of-type(1) {
    margin-top: 32px;
  }
`;

const StyledText = styled(Text)`
  margin: 16px 0;
`;

const LoginPage = ({ ...prop }) => {
  const { updateUserInfo } = useUser();
  const history = useHistory();
  const [initLoading, setInitLoading] = useState(false);
  const { isLoading, errors, handleChange, handleSubmit } = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async ({ email, password }) => {
      try {
        const response = await authApi.login({ email, password });
        sessionStorage.setItem(
          'WAFFLE_TOKEN',
          JSON.stringify(response.data.token),
        );
        await updateUserInfo(); // TODO: userContext 동작확인
        Swal.fire({
          title: '🥳',
          text: '로그인 되었습니다!',
          confirmButtonColor: Common.colors.point,
        }).then(() => {
          history.push('/');
          window.location.reload();
        });
      } catch (error) {
        Swal.fire({
          title: '🥲',
          text: '이메일과 비밀번호를 확인해주세요.',
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

  useEffect(() => {
    const getUserInfo = async () => {
      setInitLoading(true);
      if (await getUserInfoByToken()) {
        Swal.fire({
          title: '🤯',
          text: '이미 로그인 되어있습니다.',
          confirmButtonColor: Common.colors.point,
        }).then(() => {
          history.push('/');
        });
      }
      setInitLoading(false);
    };
    getUserInfo();
  }, [history]);

  const handleClickSignUpButton = () => {
    history.push('/signup');
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
      <Spinner loading={isLoading || initLoading} />
    </Container>
  );
};

export default LoginPage;
