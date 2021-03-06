import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import Common from '@/styles';
import { useForm } from '@/hooks';
import { useUser } from '@/hooks';
import styled from '@emotion/styled';
import { formValidator } from '@/utils';
import { Text, Button, Input, BackButton, Spinner } from '@/components';

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
          title: '๐ฅณ',
          text: '๋ก๊ทธ์ธ ๋์์ต๋๋ค!',
          confirmButtonColor: Common.colors.point,
        }).then(() => {
          navigate('/', { replace: true });
        });
      } catch (error: any) {
        Swal.fire({
          title: '๐ฅฒ',
          text: error.message,
          confirmButtonColor: Common.colors.point,
        });
      }
    },
    validate: ({ email, password }) => {
      const errors: { [key: string]: string } = {};

      if (!formValidator.validateEmailForm(email)) {
        errors.email = '์ฌ๋ฐ๋ฅธ ์ด๋ฉ์ผ์ ์๋ ฅํด์ฃผ์ธ์.';
      }
      if (!formValidator.validateEmailEmpty(email))
        errors.email = '์ด๋ฉ์ผ์ ์๋ ฅํด์ฃผ์ธ์.';
      if (!formValidator.validatePasswordLength(password)) {
        errors.password = '๋น๋ฐ๋ฒํธ๋ฅผ 8์ ์ด์ ์์ฑํด์ฃผ์ธ์.';
      }
      if (!formValidator.validatePasswordEmpty(password)) {
        errors.password = '๋น๋ฐ๋ฒํธ๋ฅผ ์๋ ฅํด์ฃผ์ธ์.';
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
          ์ํ์นด๋ ๋ํ์ ์ฐธ์ฌํด๋ณด์๊ฒ ์ด์?
        </Header>
        <InputWrapper>
          <StyledText>์ด๋ฉ์ผ</StyledText>
          <Input name="email" type="email" onChange={handleChange} />
          <StyledText color="red">{errors.email}&nbsp;</StyledText>
          <StyledText>๋น๋ฐ๋ฒํธ</StyledText>
          <Input name="password" type="password" onChange={handleChange} />
          <StyledText color="red">{errors.password}&nbsp;</StyledText>
        </InputWrapper>
        <StyledButton type="submit">์์ฅํ๊ธฐ</StyledButton>
        <StyledButton
          type="button"
          onClick={handleClickSignUpButton}
          backgroundColor="white"
          fontColor={Common.colors.button_font_dark}
        >
          ๊ฐ์ํ๊ธฐ
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
