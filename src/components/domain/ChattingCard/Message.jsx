import styled from '@emotion/styled';
import Common from '@styles';
import EditBox from '@components/domain/EditBox';
import { useHover } from '@hooks';
import { cardApi } from '@apis';
import Swal from 'sweetalert2';

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

const Message = ({ children, commentId, isMine, onRemove, ...props }) => {
  const [ref, state] = useHover(null);

  const handleClickEditIcon = () => {
    alert('edit!');
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
            data: { id: commentId },
          });

          if (response.status === 200) {
            onRemove(commentId);
          }
        } catch (e) {
          console.error(e);
        }
      }
    });
  };

  return (
    <ChatBox ref={ref}>
      {isMine && state ? (
        <EditBoxContainer>
          <EditBox
            onEditIconClick={handleClickEditIcon}
            onDeleteIconClick={handleClickDeleteIcon}
          />
        </EditBoxContainer>
      ) : undefined}
      {children}
    </ChatBox>
  );
};

export default Message;
