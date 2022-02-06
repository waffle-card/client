import React from 'react';
import styled from '@emotion/styled';
import Comment from './Comment';

const CommentList = () => {
  return (
    <Container>
      <Comment userName={'유저'} text={'안녕하세요!'} />
    </Container>
  );
};

const Container = styled.div``;

export default CommentList;
