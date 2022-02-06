import React from 'react';
import styled from '@emotion/styled';
import Comment from './Comment';

const text = `안녕하세요.
제 이름은 정윤호 입니다.제 이름제 이름은 정윤호 입니다.제 이름은 정윤호 입니다.
제 이름은 정윤호 입니다.`;

const CommentList = () => {
  return (
    <Container>
      <Comment
        type="edit"
        commentData={{
          userName: '유노',
          text: text,
        }}
      />
    </Container>
  );
};

const Container = styled.div``;

export default CommentList;
