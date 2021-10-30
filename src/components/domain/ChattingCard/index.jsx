import styled from '@emotion/styled';
import Modal from '@components/base/Modal';
import Header from './Header';
import Message from './Message';
import Text from '@components/base/Text';
import Common from '@styles';

const StyledModal = styled(Modal)`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  @media ${Common.media.sm} {
    width: 290px;
    height: 528px;
  }

  @media ${Common.media.md} {
    width: 688px;
    height: 874px;
  }

  @media ${Common.media.lg} {
    width: 740px;
    height: 874px;
  }
`;

const HeaderContainer = styled.div`
  min-width: 290px;
  max-width: 740px;
  min-height: 120px;
  max-height: 195px;
  padding: 15px 40px 0 40px;
  background-color: royalblue;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  box-shadow: ${Common.shadow.chattingHeader};

  @media ${Common.media.sm} {
    width: 290px;
    height: 120px;
  }

  @media ${Common.media.md} {
    width: 688px;
    height: 195px;
  }

  @media ${Common.media.lg} {
    width: 740px;
    height: 195px;
  }
`;

const Hr = styled.hr`
  width: 90%;
  border: none;
  border-bottom: 0.5px solid rgba(255, 255, 255, 0.5);
  border-radius: 50%;
`;

const FirstHashtags = styled.div`
  display: flex;
  justify-content: space-between;
  color: white;
  margin-top: 12px;

  @media ${Common.media.sm} {
    font-size: ${Common.fontSize.small};
  }
`;

const SecondHashtags = styled.div`
  display: flex;
  justify-content: space-evenly;
  color: white;
  margin-top: 12px;
`;

const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 98px;
  max-height: 400px;
  padding: 10px;
  background-color: transparent;
  background-color: ${Common.colors.background_modal};
  overflow-y: auto;
`;

const ChatContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  background-color: transparent;
  justify-content: ${({ isMine }) => (isMine ? 'end' : 'start')};
  margin-left: ${({ isMine }) => (isMine ? '0' : '20px')};
  margin-right: ${({ isMine }) => (isMine ? '20px' : '0')};
  margin-top: 10px;
  margin-bottom: 10px;
`;

const Footer = styled.div`
  display: flex;
  background-color: ${Common.colors.background_modal};
  min-height: 180px;
  max-height: 200px;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const InputBox = styled.div`
  display: flex;
  background-color: ${Common.colors.speech_bubble};
  width: 100%;
  height: 144px;
  min-height: 44px;
  max-height: 144px;
  border-radius: 16px;
  padding: 10px 20px 10px 20px;
`;

const ChattingCard = ({
  children,
  width,
  height,
  backgroundColor,
  cardData,
  ...props
}) => {
  // API가 필요한 부분
  const myId = 1;

  const logs = [
    {
      id: 1,
      name: 'A',
      chat: '안녕하세요~',
    },
    {
      id: 2,
      name: 'B',
      chat: '안녕하세요! 만나서 반갑습니다!',
    },
    {
      id: 3,
      name: 'C',
      chat: '반가워요~',
    },
    {
      id: 1,
      name: 'A',
      chat: '오늘 저녁 뭐 드실건가요?',
    },
    {
      id: 2,
      name: 'B',
      chat: '다이어트 중이에요~',
    },
    {
      id: 3,
      name: 'C',
      chat: '전 김치볶음밥이요!',
    },
  ];

  const showChat = logs =>
    logs.map((log, index) => (
      <ChatContainer isMine={log.id === myId} key={index}>
        <Message logId={log.id} key={index} myId={myId}>
          <Text>
            {log.name}: {log.chat}
          </Text>
        </Message>
      </ChatContainer>
    ));

  const firstHashtags = [
    '#안녕하세요반갑습니다',
    '#10글자로만들어봐요',
    '우리모두함께놀아봐요',
  ];
  const secondHashtags = ['#해쉬태그를만들어봐요', '#최대한길게길게갑시다'];

  const hashtagsDiv = hashtags => hashtags.map(hashtag => <div>{hashtag}</div>);

  return (
    <StyledModal
      style={{ padding: 0, display: 'flex', flexDirection: 'column' }}
      visible>
      <HeaderContainer backgroundColor={backgroundColor}>
        <Header />
        <Hr />
        <FirstHashtags>{hashtagsDiv(firstHashtags)}</FirstHashtags>
        <SecondHashtags>{hashtagsDiv(secondHashtags)}</SecondHashtags>
      </HeaderContainer>
      <BodyContainer>{showChat(logs)}</BodyContainer>
      <Footer>
        <InputBox>
          <Text>메세지를 입력하세요</Text>
        </InputBox>
      </Footer>
    </StyledModal>
  );
};

export default ChattingCard;
