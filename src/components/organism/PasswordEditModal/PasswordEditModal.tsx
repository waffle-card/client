import React from 'react';
import Common from '@/styles';
import styled from '@emotion/styled';
import { useForm } from '@/hooks';
import { Modal, Text, Button, Input, Spinner } from '@/components';
import {
  validatePasswordEmpty,
  validatePasswordLength,
  validatePasswordConfirm,
} from '@/validators';

export interface PasswordEditModalProps {
  visible?: boolean;
  onClose: () => void;
  onSubmit: (values: { [key: string]: string }) => Promise<void>;
}

const PasswordEditModal = ({
  visible,
  onClose,
  onSubmit,
  ...props
}: PasswordEditModalProps): JSX.Element => {
  const { isLoading, errors, handleChange, handleSubmit } = useForm({
    initialValues: {
      newPassword: '',
      passwordConfirm: '',
    },
    onSubmit,
    validate: ({ newPassword, passwordConfirm }) => {
      const errors: { [key: string]: string } = {};

      if (!validatePasswordEmpty(newPassword)) {
        errors.newPassword = '비밀번호를 입력해주세요.';
      }
      if (!validatePasswordLength(newPassword)) {
        errors.newPassword = '비밀번호를 8자 이상 작성해주세요.';
      }
      if (!validatePasswordEmpty(newPassword)) {
        errors.newPassword = '비밀번호를 입력해주세요.';
      }

      if (!validatePasswordEmpty(passwordConfirm)) {
        errors.newPassword = '비밀번호를 입력해주세요.';
      }
      if (!validatePasswordLength(passwordConfirm)) {
        errors.passwordConfirm = '비밀번호를 8자 이상 작성해주세요.';
      }
      if (!validatePasswordEmpty(passwordConfirm)) {
        errors.passwordConfirm = '비밀번호를 입력해주세요.';
      }

      if (!validatePasswordConfirm(newPassword, passwordConfirm)) {
        errors.passwordConfirm = '비밀번호가 일치하는지 확인해주세요.';
      }

      return errors;
    },
  });

  const handleClose = () => {
    onClose && onClose();
  };

  return (
    <>
      <StyledModal visible={visible} onClose={onClose} {...props}>
        <form onSubmit={handleSubmit}>
          {/* <ConfirmBox>
            <StyledText>현재 비밀번호</StyledText>
            <InputContainer>
              <Input
                name="currentPassword"
                type="password"
                onChange={handleChange}
              />
              <ErrorText color="red">{errors.currentPassword}&nbsp;</ErrorText>
            </InputContainer>
          </ConfirmBox> */}
          <ConfirmBox>
            <StyledText>새 비밀번호</StyledText>
            <InputContainer>
              <Input
                name="newPassword"
                type="password"
                onChange={handleChange}
              />
              <ErrorText color="red">{errors.newPassword}&nbsp;</ErrorText>
            </InputContainer>
          </ConfirmBox>
          <ConfirmBox>
            <StyledText>새 비밀번호 확인</StyledText>
            <InputContainer>
              <Input
                name="passwordConfirm"
                type="password"
                onChange={handleChange}
              />
              <ErrorText color="red">{errors.passwordConfirm}&nbsp;</ErrorText>
            </InputContainer>
          </ConfirmBox>
          <ButtonContainer>
            <StyledButton type="submit">변경하기</StyledButton>
            <StyledButton
              type="button"
              backgroundColor={Common.colors.primary}
              fontColor={Common.colors.button_font_dark}
              onClick={handleClose}
            >
              닫기
            </StyledButton>
          </ButtonContainer>
        </form>
      </StyledModal>
      <Spinner loading={isLoading} />
    </>
  );
};

PasswordEditModal.defaultProps = {
  visible: false,
};

const StyledModal = styled(Modal)`
  width: 100%;
  max-width: 740px;
  padding: 60px 90px;
  @media ${Common.media.sm} {
    width: 360px;
    padding: 60px 60px;
  }
`;

const StyledText = styled(Text)`
  margin-bottom: 16px;
  @media ${Common.media.sm} {
    font-size: ${Common.fontSize.small};
  }
`;

const ConfirmBox = styled.div`
  &:nth-of-type(1) {
    margin-bottom: 64px;
  }
  &:nth-of-type(2) {
    margin-bottom: 24px;
  }
  @media ${Common.media.sm} {
    &:nth-of-type(1) {
      margin-bottom: 32px;
    }
    &:nth-of-type(2) {
      margin-bottom: 16px;
    }
  }
`;

const InputContainer = styled.div``;

const ErrorText = styled(Text)`
  margin-top: 16px;
  @media ${Common.media.sm} {
    font-size: ${Common.fontSize.small};
  }
`;

const ButtonContainer = styled.div`
  margin-top: 80px;
  @media ${Common.media.sm} {
    margin-top: 48px;
  }
`;

const StyledButton = styled(Button)`
  width: 100%;
  font-size: ${Common.fontSize.medium};
  font-weight: ${Common.fontWeight.bold};
  &:first-of-type {
    margin-bottom: 32px;
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

export default PasswordEditModal;
