import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import Common from '@/styles';
import { authApi } from '@/apis';
import { useForm } from '@/hooks';
import styled from '@emotion/styled';
import { formValidator } from '@/utils';
import { Text, Button, Input, BackButton, Spinner } from '@/components';

const SignUpPage = () => {
  const navigate = useNavigate();
  const { isLoading, errors, handleChange, handleSubmit } = useForm({
    initialValues: {
      email: '',
      userName: '',
      password: '',
      passwordConfirm: '',
    },
    onSubmit: async ({ email, userName, password }) => {
      try {
        await authApi.signup({
          name: userName,
          email,
          password,
        });

        Swal.fire({
          title: '๐',
          text: 'ํ์ํฉ๋๋ค! ์ด์  ๋ก๊ทธ์ธ์ ํด์ฃผ์ธ์!',
          confirmButtonColor: Common.colors.point,
        }).then(() => {
          navigate('/login');
        });
      } catch (error: any) {
        Swal.fire({
          title: '๐ฅฒ',
          text:
            error.message ??
            '์ ์ ์๋ ์ค๋ฅ๊ฐ ๋ฐ์ํ์ต๋๋ค. ๋ค์ ์๋ํด์ฃผ์ธ์.',
          confirmButtonColor: Common.colors.point,
        });
      }
    },
    validate: ({ email, userName, password, passwordConfirm }) => {
      const errors: { [key: string]: string } = {};

      if (!formValidator.validateEmailForm(email)) {
        errors.email = '์ฌ๋ฐ๋ฅธ ์ด๋ฉ์ผ์ ์๋ ฅํด์ฃผ์ธ์.';
      }
      if (!formValidator.validateEmailEmpty(email))
        errors.email = '์ด๋ฉ์ผ์ ์๋ ฅํด์ฃผ์ธ์.';
      if (!formValidator.validateNameEmpty(userName))
        errors.userName = '์ด๋ฆ์ ์๋ ฅํด์ฃผ์ธ์.';
      if (!formValidator.validateNameLength(userName))
        errors.userName = '์ด๋ฆ์ 10๊ธ์ ์ด๋ด๋ก ์์ฑํด์ฃผ์ธ์.';
      if (!formValidator.validatePasswordLength(password)) {
        errors.password = '๋น๋ฐ๋ฒํธ๋ฅผ 8์ ์ด์ ์์ฑํด์ฃผ์ธ์.';
      }
      if (!formValidator.validatePasswordEmpty(password)) {
        errors.password = '๋น๋ฐ๋ฒํธ๋ฅผ ์๋ ฅํด์ฃผ์ธ์.';
      }
      if (!formValidator.validatePasswordConfirm(password, passwordConfirm)) {
        errors.passwordConfirm = '๋น๋ฐ๋ฒํธ๊ฐ ์ผ์นํ๋์ง ํ์ธํด์ฃผ์ธ์.';
      }

      return errors;
    },
  });

  return (
    <Container>
      <StyledBackButton />
      <ContentContainer onSubmit={handleSubmit}>
        <Header size={Common.fontSize.large}>
          ํ์๊ฐ์ํ๊ณ  ์ํ์นด๋ ๋ง๋ค๋ฌ๊ฐ์!
        </Header>
        <InputWrapper>
          <StyledText>์ด๋ฉ์ผ</StyledText>
          <Input name="email" type="email" onChange={handleChange} />
          <StyledText color="red">{errors.email}&nbsp;</StyledText>
          <StyledText>์ด๋ฆ(๋๋ค์)</StyledText>
          <Input name="userName" type="text" onChange={handleChange} />
          <StyledText color="red">{errors.userName}&nbsp;</StyledText>
          <StyledText>๋น๋ฐ๋ฒํธ</StyledText>
          <Input name="password" type="password" onChange={handleChange} />
          <StyledText color="red">{errors.password}&nbsp;</StyledText>
          <StyledText>๋น๋ฐ๋ฒํธ ํ์ธ</StyledText>
          <Input
            name="passwordConfirm"
            type="password"
            onChange={handleChange}
          />
          <StyledText color="red">{errors.passwordConfirm}&nbsp;</StyledText>
        </InputWrapper>
        <StyledButton type="submit">๊ฐ์ํ๊ธฐ</StyledButton>
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
  height: calc(100vh + 110px);
  padding: 100px 0;
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
  margin: 20px 0;
  font-weight: ${Common.fontWeight.bold};
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
  @media ${Common.media.sm} {
    font-size: ${Common.fontSize.small};
    margin-bottom: 20px;
  }
`;

export default SignUpPage;
