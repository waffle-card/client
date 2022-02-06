import React, { useRef } from 'react';
import styled from '@emotion/styled';
import Common from '@styles';
import { EditBox } from '@components';

const Comment = ({ type = 'basic', commentData, ...props }) => {
  const ref = useRef(null);
  // const scrollHeight = ref.current.scrollHeight;
  console.log(ref);

  return (
    <Container>
      <EditBox />
      <TextArea
        ref={ref}
        readOnly
        value={`${commentData.userName} : ${commentData.text}`}
      />
    </Container>
  );
};

const Container = styled.div`
  display: inline-flex;
  /* justify-content: center; */
  /* align-items: center; */
  background-color: ${Common.colors.speech_bubble};
  border-radius: 1rem;
`;

const TextArea = styled.textarea`
  /* width: 100%; */
  margin: 1rem;
  border: none;
  border-radius: 8px 0 0 8px;
  outline: none;
  background-color: transparent;
  resize: none;
  font-size: ${Common.fontSize.medium};
  color: ${Common.colors.primary};
`;

export default Comment;
