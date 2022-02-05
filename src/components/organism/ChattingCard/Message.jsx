import styled from '@emotion/styled';
import Common from '@styles';
import { EditBox, Text } from '@components';
import { cardApi } from '@apis';
import Swal from 'sweetalert2';
import { useCallback, useEffect, useRef, useState } from 'react';
import React from 'react';
import PropTypes from 'prop-types';

const ChatBox = styled.div`
  display: flex;
  align-items: center;
  background-color: ${Common.colors.speech_bubble};
  border-radius: 16px;
  max-width: 550px;
  min-height: 50px;
  box-sizing: border-box;

  @media ${Common.media.sm} {
    min-width: 80px;
    max-width: 150px;
    min-height: 25px;
    border-radius: 8px;
    padding: 10px;
  }

  @media ${Common.media.md} {
    min-width: 150px;
    max-width: 300px;
    padding: 10px 20px 10px 20px;
  }

  @media ${Common.media.lg} {
    min-width: 150px;
    max-width: 300px;
    padding: 10px 20px 10px 20px;
  }
`;

const StyledText = styled(Text)`
  display: flex;
  align-items: center;
  white-space: pre-wrap;

  @media ${Common.media.sm} {
    font-size: 10px;
  }

  @media ${Common.media.md} {
    font-size: ${Common.fontSize.md};
  }

  @media ${Common.media.lg} {
    font-size: ${Common.fontSize.lg};
  }
`;

const EditBoxContainer = styled.div`
  position: absolute;

  @media ${Common.media.sm} {
    top: -50%;
    right: 0;
  }

  @media ${Common.media.md} {
    top: -10%;
    right: 0;
  }

  @media ${Common.media.lg} {
    top: -10%;
    right: 0;
  }
`;

const Message = ({ comment, isMine, onRemove, ...props }) => {
  const hoverRef = useRef(null);
  const [isHover, setIsHover] = useState(false);
  const [text, setText] = useState(comment.comment);

  const handleMouseEnter = useCallback(() => setIsHover(true), []);
  const handleMouseLeave = useCallback(() => setIsHover(false), []);

  useEffect(() => {
    const element = hoverRef.current;

    if (element && isMine) {
      element.addEventListener('mouseenter', handleMouseEnter);
    }
  }, [handleMouseEnter, isMine]);

  useEffect(() => {
    const element = hoverRef.current;

    if (element && isMine) {
      element.addEventListener('mouseleave', handleMouseLeave);
    }
  }, [handleMouseLeave, isMine]);

  const handleClickEditIcon = async () => {
    const swalQueue = Swal.mixin({
      confirmButtonText: '수정하기',
      confirmButtonColor: Common.colors.point,
      cancelButtonText: '돌아가기',
      cancelButtonColor: Common.colors.red,
      progressSteps: ['😏'],
      input: 'text',
      inputAttributes: {
        required: true,
      },
      reverseButtons: false,
      validationMessage: '공백은 안될텐데요? 🤔',
    });

    const result = await swalQueue.fire({
      title: '댓글을 수정하세요!',
      showCancelButton: true,
      currentProgressStep: false,
    });

    if (result.value) {
      await cardApi
        .updateCardComment({
          id: comment._id,
          comment: result.value,
        })
        .then(() => {
          Swal.fire({
            title: `댓글을 수정했어요!😁`,
            confirmButtonText: '확인',
            confirmButtonColor: Common.colors.point,
          });
        })
        .then(() => {
          setText(result.value);
        });
    }
  };

  const handleClickDeleteIcon = async () => {
    Swal.fire({
      title: '😫',
      text: '댓글을 삭제하실건가요?',
      showCancelButton: true,
      confirmButtonColor: Common.colors.point,
      cancelButtonColor: Common.colors.red,
      confirmButtonText: '삭제하기',
      cancelButtonText: '취소하기',
    }).then(async res => {
      if (res.isConfirmed) {
        await cardApi
          .deleteCardComment({
            data: { id: comment._id },
          })
          .then(() => {
            onRemove(comment._id);
          })
          .catch(e => {
            console.error(e);
            Swal.fire({
              title: '😡',
              text: '에러가 발생했어요!',
              confirmButtonColor: Common.colors.point,
            });
          });
      }
    });
  };

  return (
    <ChatBox ref={hoverRef}>
      <StyledText block>
        {isMine && isHover && (
          <EditBoxContainer>
            <EditBox
              onEditIconClick={handleClickEditIcon}
              onDeleteIconClick={handleClickDeleteIcon}
            />
          </EditBoxContainer>
        )}
        {comment.author.fullName + ' : ' + text}
      </StyledText>
    </ChatBox>
  );
};

Message.propTypes = {
  comment: PropTypes.object,
  isMine: PropTypes.bool,
  onRemove: PropTypes.func,
};

export default React.memo(Message);
