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
        placeholder={
          disabled
            ? '로그인 후 댓글을 작성할 수 있습니다.'
            : '댓글을 입력하세요.'
        }
        onChange={handleChange}
        onKeyUp={handleKeyUp}
        value={text}
      />
      <Button
        disabled={disabled}
        type="button"
        onClick={handleClickSubmitButton}>
        댓글 쓰기
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
  border-radius: 8px 0 0 8px;
  outline: none;
  background-color: ${Common.colors.backgroundButton};
  resize: none;

  @media ${Common.media.sm} {
    font-size: ${Common.fontSize.small};
  }
  @media ${Common.media.md} {
    font-size: ${Common.fontSize.medium};
  }
  @media ${Common.media.lg} {
    font-size: ${Common.fontSize.medium};
  }
`;

const Button = styled.button`
  width: 100px;
  height: 100%;
  background-color: ${Common.colors.point};
  border: none;
  border-radius: 0 8px 8px 0;
  color: ${Common.colors.textQuaternary};
  cursor: pointer;

  &:active {
    background-color: ${Common.colors.pointLight};
  }

  @media ${Common.media.sm} {
    font-size: ${Common.fontSize.small};
  }
  @media ${Common.media.md} {
    font-size: ${Common.fontSize.medium};
  }
  @media ${Common.media.lg} {
    font-size: ${Common.fontSize.medium};
  }
`;

export default CommentEditor;
