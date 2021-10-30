import styled from '@emotion/styled';
import Common from '@styles';
import EditBox from '@components/domain/EditBox';
import { useHover } from '@hooks';

const ChatBox = styled.div`
  display: flex;
  align-items: center;
  background-color: ${Common.colors.speech_bubble};
  border-radius: 16px;
  min-width: 170px;
  max-width: 550px;
  min-height: 50px;
  max-height: 150px;
  padding: 10px 20px 10px 20px;

  @media ${Common.media.sm} {
    min-width: 160px;
    max-width: 190px;
  }

  @media ${Common.media.md} {
    min-width: 190px;
    max-width: 240px;
  }

  @media ${Common.media.lg} {
    min-width: 240px;
  }
`;

const EditBoxContainer = styled.div`
  position: absolute;
  top: -40%;
  right: 0;
  z-index: 1000;
`;

const Message = ({ children, logId, key, myId, ...props }) => {
  const [ref, state] = useHover(null);

  return (
    <ChatBox ref={ref} key={key}>
      {logId === myId && state ? (
        <EditBoxContainer>
          <EditBox />
        </EditBoxContainer>
      ) : undefined}
      {children}
    </ChatBox>
  );
};

export default Message;
