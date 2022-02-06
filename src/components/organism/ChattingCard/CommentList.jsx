import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Comment from './Comment';

const dummy = [
  {
    _id: '123',
    userId: '123',
    userName: '유노',
    waffleCardId: '321',
    text: `안녕하세요.
    제 이름은 정윤호 입니다.제 이름제 이름은 정윤호 입니다.제 이름은 정윤호 입니다.
    제 이름은 정윤호 입니다.`,
    createdAt: '123',
    updatedAt: '123String',
    id: '123String',
  },
  {
    _id: '123',
    userId: '123',
    userName: '윤호',
    waffleCardId: '321',
    text: `안녕하세요. 제 이름제 이름도 정윤호 입니다. 신기하네요`,
    createdAt: '123',
    updatedAt: '123String',
    id: '312',
  },
  {
    _id: '123',
    userId: '123',
    userName: '유노',
    waffleCardId: '321',
    text: `안녕하세요.
    제 이름은 정윤호 입니다.제 이름제 이름은 정윤호 입니다.제 이름은 정윤호 입니다.
    제 이름은 정윤호 입니다.`,
    createdAt: '123',
    updatedAt: '123String',
    id: '123Sting',
  },
  {
    _id: '123',
    userId: '123',
    userName: '유노',
    waffleCardId: '321',
    text: `안녕하세요.
    제 이름은 정윤호 입니다.제 이름제 이름은 정윤호 입니다.제 이름은 정윤호 입니다.
    제 이름은 정윤호 입니다.`,
    createdAt: '123',
    updatedAt: '123String',
    id: '123Strin',
  },
];

const CommentList = ({
  commentsData,
  myCommentIds,
  onClickEditMyComment,
  onClickDeleteMyComment,
  ...props
}) => {
  return (
    <Container {...props}>
      {commentsData.map(commentData =>
        myCommentIds.includes(commentData.id) ? (
          <MyComment
            key={commentData.id}
            type="edit"
            commentData={commentData}
            onClickEdit={onClickEditMyComment}
            onClickDelete={onClickDeleteMyComment}
          />
        ) : (
          <Comment key={commentData.id} commentData={commentData} />
        ),
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 1rem;
`;

const MyComment = styled(Comment)`
  align-self: flex-end;
`;

CommentList.propTypes = {
  commentsData: PropTypes.array,
  myCommentIds: PropTypes.array,
  onClickEditMyComment: PropTypes.func,
  onClickDeleteMyComment: PropTypes.func,
};

CommentList.defaultProps = {
  commentsData: dummy,
  myCommentIds: ['312'],
};

export default CommentList;
