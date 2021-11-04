import styled from '@emotion/styled';
import Common from '@styles';
import { EditBox, Text } from '@components';
import { cardApi } from '@apis';
import Swal from 'sweetalert2';
import { useCallback, useEffect, useRef, useState } from 'react';
import React from 'react';

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

const StyledDiv = styled.div`
  -moz-appearance: ${({ isEditable }) => (isEditable ? 'textfield' : '')};
  -webkit-appearance: ${({ isEditable }) => (isEditable ? 'textfield' : '')};
  user-modify: ${({ isEditable }) => (isEditable ? 'read-write' : '')};
  background-color: transparent;
  border: none;
  outline: none;
  cursor: ${({ isEditable }) => (isEditable ? 'text' : 'default')};
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
  const hoverRef = useRef();
  const editRef = useRef();
  const [isHover, setIsHover] = useState(false);
  const [isEditable, setIsEditable] = useState(false);

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

    if (element && !isEditable && isMine) {
      element.addEventListener('mouseleave', handleMouseLeave);
    }
  }, [handleMouseLeave, isEditable, isMine]);

  // useEffect(async () => {
  //   const response = await
  // }, [])

  const handleClickEditIcon = () => {
    editRef.current.focus();
    setIsEditable(true);
  };

  const handleClickDeleteIcon = async () => {
    Swal.fire({
      title: '😫',
      text: '댓글을 삭제하시겠습니까?',
      showCancelButton: true,
      confirmButtonColor: Common.colors.point,
      cancelButtonColor: Common.colors.red,
      confirmButtonText: '예',
      cancelButtonText: '아니오',
    }).then(async res => {
      if (res.isConfirmed) {
        try {
          const response = await cardApi.deleteCardComment({
            data: { id: comment._id },
          });

          if (response.status === 200) {
            onRemove(comment._id);
          }
        } catch (e) {
          console.error(e);
          return;
        }
      }
    });
  };

  return (
    <ChatBox ref={hoverRef}>
      {isMine && isHover && (
        <EditBoxContainer>
          <EditBox
            onEditIconClick={handleClickEditIcon}
            onDeleteIconClick={handleClickDeleteIcon}
          />
        </EditBoxContainer>
      )}
      <StyledText block>
        {comment.author.fullName + ' : '}
        <StyledDiv ref={editRef} isEditable={isMine}>
          {comment.comment}
        </StyledDiv>
      </StyledText>
    </ChatBox>
  );
};

export default React.memo(Message);
