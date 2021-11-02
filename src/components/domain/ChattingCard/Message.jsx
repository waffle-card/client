import styled from '@emotion/styled';
import Common from '@styles';
import EditBox from '@components/domain/EditBox';
import { useHover } from '@hooks';

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

const Message = ({ children, isMine, ...props }) => {
  const [ref, state] = useHover(null);

  return (
    <ChatBox ref={ref}>
      {isMine && state ? (
        <EditBoxContainer>
          <EditBox />
        </EditBoxContainer>
      ) : undefined}
      {children}
    </ChatBox>
  );
};

export default Message;
