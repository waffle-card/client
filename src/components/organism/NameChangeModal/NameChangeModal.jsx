import React from 'react';
import Common from '@styles';
import styled from '@emotion/styled';
import { useForm } from '@hooks';
import PropTypes from 'prop-types';
import { Modal, Text, Button, Input, Spinner } from '@components';
import { validateNameEmpty, validateNameLength } from '@validators';

const NameChangeModal = ({
  userName,
  visible,
  onClose,
  onSubmit,
  ...props
}) => {
  const { isLoading, errors, handleChange, handleSubmit } = useForm({
    initialValues: {
      userName: '',
    },
    onSubmit,
    validate: ({ userName }) => {
      const errors = {};

      if (!validateNameEmpty(userName)) errors.userName = '이름을 입력해주세요';
      if (!validateNameLength(userName))
        errors.userName = '이름을 10글자 이내로 작성해주세요';

      return errors;
    },
  });

  const handleClose = e => {
    onClose && onClose(e);
  };

  return (
    <>
      <StyledModal visible={visible} onClose={onClose} {...props}>
        <form onSubmit={handleSubmit}>
          <StyledText>이름(닉네임)</StyledText>
          <InputContainer>
            <Input
              name="userName"
              type="text"
              placeholder={userName}
              onChange={handleChange}
            />
            <ErrorText color="red">{errors.userName}&nbsp;</ErrorText>
          </InputContainer>
          <StyledButton type="submit">변경하기</StyledButton>
          <StyledButton
            type="button"
            backgroundColor={Common.colors.primary}
            fontColor={Common.colors.button_font_dark}
            onClick={handleClose}>
            닫기
          </StyledButton>
        </form>
      </StyledModal>
      <Spinner loading={isLoading} />
    </>
  );
};

NameChangeModal.propTypes = {
  userName: PropTypes.string,
  visible: PropTypes.bool,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
};

NameChangeModal.defaultProps = {
  userName: '',
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

const InputContainer = styled.div`
  margin-bottom: 56px;
  @media ${Common.media.sm} {
    margin-bottom: 24px;
  }
`;

const ErrorText = styled(Text)`
  margin-top: 16px;
  @media ${Common.media.sm} {
    font-size: ${Common.fontSize.small};
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

export default NameChangeModal;
