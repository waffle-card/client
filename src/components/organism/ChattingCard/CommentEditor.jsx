import React, { useState } from 'react';
import styled from '@emotion/styled';
import Common from '@styles';

const CommentEditor = ({ onSubmit, onChange, disabled = false, ...props }) => {
  const [text, setText] = useState('');

  const submitText = text => {
    const trimmedText = text.trim();
    if (trimmedText === '') return;
    onSubmit && onSubmit(trimmedText);
  };

  const handleChange = e => {
    setText(e.target.value);
    onChange && onChange(e);
  };

  const handleKeyUp = e => {
    if (e.key === 'Enter' && e.shiftKey) return;
    if (e.key === 'Enter') {
      submitText(text);
      setText('');
    }
  };

  const handleClickSubmitButton = e => {
    submitText(text);
  };

  return (
    <Form {...props}>
      <TextArea
        id="content"
        name="content"
        disabled={disabled}
        placeholder={'메세지를 입력해주세요.'}
        onChange={handleChange}
        onKeyUp={handleKeyUp}
        value={text}
      />
      <Button
        disabled={disabled}
        type="button"
        onClick={handleClickSubmitButton}>
        입력
      </Button>
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  width: 100%;
  height: 100px;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 100%;
  padding: 1rem;
  border: none;
  border-radius: 0 0 0 1rem;
  resize: none;
  outline: none;
  color: ${Common.colors.primary};
  background-color: ${Common.colors.speech_bubble};

  @media ${Common.media.sm} {
    font-size: ${Common.fontSize.small};
  }
  @media ${Common.media.md} {
    font-size: ${Common.fontSize.base};
  }
  @media ${Common.media.lg} {
    font-size: ${Common.fontSize.medium};
  }
`;

const Button = styled.button`
  height: 100%;
  background-color: ${Common.colors.point};
  border: none;
  border-radius: 0 0 1rem 0;
  color: ${Common.colors.primary};
  cursor: pointer;

  &:active {
    background-color: ${Common.colors.pointLight};
  }
  @media ${Common.media.sm} {
    width: 60px;

    font-size: ${Common.fontSize.small};
  }
  @media ${Common.media.md} {
    width: 80px;

    font-size: ${Common.fontSize.base};
  }
  @media ${Common.media.lg} {
    width: 80px;

    font-size: ${Common.fontSize.medium};
  }
`;

export default CommentEditor;
