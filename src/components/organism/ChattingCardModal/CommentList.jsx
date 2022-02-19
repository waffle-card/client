import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Comment from './Comment';
import { useScrollToBottom } from '@/hooks';

const CommentList = ({
  commentsData,
  userData,
  onClickEditMyComment,
  onClickDeleteMyComment,
  ...props
}) => {
  const ref = useScrollToBottom();

  return (
    <Container ref={ref} {...props}>
      {commentsData.map(commentData =>
        userData && userData.id === commentData.user.id ? (
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
  overflow: auto;

  &::-webkit-scrollbar {
    position: absolute;
    width: 1rem;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 0.5rem;
    background-clip: padding-box;
    border: 4.8px solid transparent;
    box-shadow: inset 0px 0px 3px white;
  }
  &::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0);
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const MyComment = styled(Comment)`
  align-self: flex-end;
`;

CommentList.propTypes = {
  commentsData: PropTypes.array.isRequired,
  userData: PropTypes.object,
  onClickEditMyComment: PropTypes.func,
  onClickDeleteMyComment: PropTypes.func,
};

export default CommentList;
