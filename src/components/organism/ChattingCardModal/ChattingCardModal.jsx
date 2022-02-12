import React, { useState } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import Common from '@styles';
import { Modal, Spinner } from '@components';
import Header from './Header';
import CommentEditor from './CommentEditor';
import CommentList from './CommentList';
import { useUser } from '@contexts';
import { commentApi } from '@apis';

// TODO(윤호): visible 삭제하기, 댓글 state를 가지게하여 댓글 생성, 수정, 삭제시 리렌더링 되도록 하기
const ChattingCardModal = ({
  visible,
  waffleCardData,
  commentsData,
  onClickLikeToggle,
  onClose,
  ...props
}) => {
  const { userInfo } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [comments, setComments] = useState(commentsData);

  const handleSubmitComment = async text => {
    setIsLoading(true);
    try {
      const response = await commentApi.createComment(waffleCardData.id, text);
      const comment = response.data;
      setComments(comments => [...comments, comment]);
    } catch (error) {
      console.error(`in ChattingCard : 댓글 생성 실패 - ${error.message}`);
    }
    setIsLoading(false);
  };

  const handleClickEditComment = async (commentId, text) => {
    setIsLoading(true);
    try {
      const response = await commentApi.updateComment(commentId, text);
      const comment = response.data;
      setComments(comments => [...comments, comment]);
    } catch (error) {
      console.error(`in ChattingCard : 댓글 수정 실패 - ${error.message}`);
    }
    setIsLoading(false);
  };

  const handleClickDeleteComment = async commentId => {
    Swal.fire({
      icon: 'question',
      text: '정말 삭제하시겠습니까?',
      showCancelButton: true,
      showCloseButton: true,
      confirmButtonText: '예',
      cancelButtonText: '아니오',
    }).then(async result => {
      if (result.isConfirmed) {
        setIsLoading(true);
        try {
          await commentApi.deleteComment(commentId);
          setComments(comments =>
            comments.filter(comment => comment.id !== commentId),
          );
        } catch (error) {
          console.error(`in ChattingCard : 댓글 삭제 실패 - ${error.message}`);
        }
        setIsLoading(false);
      }
    });
  };

  const handleClickLikeToggle = async likeToggled => {
    onClickLikeToggle && onClickLikeToggle(waffleCardData.id, likeToggled);
  };

  const handleClose = () => {
    onClose && onClose();
  };

  return (
    <StyledModal visible onClose={handleClose} {...props}>
      <Header
        waffleCardData={waffleCardData}
        likeToggled={
          waffleCardData && waffleCardData.likeUserIds.includes(userInfo?.id)
        }
        likeCount={waffleCardData.likeUserIds.length}
        interactiveLikeToggle={!!userInfo}
        onClickLikeToggle={handleClickLikeToggle}
        onClickBackButton={handleClose}
      />
      <StyledCommentList
        commentsData={comments}
        userData={userInfo}
        onClickEditMyComment={handleClickEditComment}
        onClickDeleteMyComment={handleClickDeleteComment}
      />
      <StyledCommentEditor
        disabled={!userInfo}
        onSubmit={handleSubmitComment}
      />
      {isLoading && <Spinner loading={isLoading} />}
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

ChattingCardModal.propTypes = {
  visible: PropTypes.bool,
  waffleCardData: PropTypes.object.isRequired,
  commentsData: PropTypes.array.isRequired,
};

ChattingCardModal.defaultProps = {
  visible: false,
  likeToggled: false,
  interactiveLikeToggle: false,
};

export default ChattingCardModal;
