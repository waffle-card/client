import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import Common from '@styles';
import { Modal } from '@components';
import Header from './Header';
import CommentEditor from './CommentEditor';
import CommentList from './CommentList';

const ChattingCard = ({
  visible,
  waffleCardData,
  commentsData,
  userData,
  onClose,
  onClickLikeToggle,
  onClickEditComment,
  onClickDeleteComment,
  onSubmitComment,
  likeToggled,
  ...props
}) => {
  const handleClose = () => {
    onClose && onClose();
  };

  const handleClickLikeToggle = (likeToggled, likeCount) => {
    onClickLikeToggle && onClickLikeToggle(likeToggled, likeCount);
  };

  const handleSubmitComment = text => {
    onSubmitComment && onSubmitComment(text);
  };

  const handleClickEditComment = (commentId, text) => {
    onClickEditComment && onClickEditComment(commentId, text);
  };

  const handleClickDeleteComment = commentId => {
    onClickDeleteComment && onClickDeleteComment(commentId);
  };

  return (
    <StyledModal visible={visible} onClose={handleClose} {...props}>
      <Header
        waffleCardData={waffleCardData}
        onClickLikeToggle={handleClickLikeToggle}
        onClickBackButton={handleClose}
        likeToggled={likeToggled}
        interactiveLikeToggle={!!userData}
      />
      <StyledCommentList
        commentsData={commentsData}
        userData={userData}
        myCommentsIds={['312']}
        onClickEditMyComment={handleClickEditComment}
        onClickDeleteMyComment={handleClickDeleteComment}
      />
      <StyledCommentEditor onSubmit={handleSubmitComment} />
    </StyledModal>
  );
};

const StyledModal = styled(Modal)`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 92vh;

  @media ${Common.media.sm} {
    width: 290px;
  }

  @media ${Common.media.md} {
    width: 688px;
  }

  @media ${Common.media.lg} {
    width: 740px;
  }
`;

const StyledCommentList = styled(CommentList)`
  margin: 1rem 1rem 116px 1rem;
`;

const StyledCommentEditor = styled(CommentEditor)`
  position: absolute;
  width: 100%;
  bottom: 0px;
`;

ChattingCard.propTypes = {
  visible: PropTypes.bool,
  waffleCardData: PropTypes.object.isRequired,
  commentsData: PropTypes.array.isRequired,
  userData: PropTypes.object,
  likeToggled: PropTypes.bool,
  interactiveLikeToggle: PropTypes.bool,
  onClose: PropTypes.func,
  onClickLikeToggle: PropTypes.func,
  onClickEditComment: PropTypes.func,
  onClickDeleteComment: PropTypes.func,
};

ChattingCard.defaultProps = {
  visible: false,
  likeToggled: false,
  interactiveLikeToggle: false,
  userData: null,
};

export default ChattingCard;
