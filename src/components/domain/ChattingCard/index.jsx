import styled from '@emotion/styled';
import Modal from '@components/base/Modal';
import Icons from '@components/base/Icons';
import Text from '@components/base/Text';
import Common from '@styles';

const Header = styled.div`
  height: 200px;
  padding: 15px 40px 0 40px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
`;

const Top = styled.div`
  display: flex;
  height: 50%;
  justify-content: space-between;
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
`;

const SecondHashtags = styled.div`
  display: flex;
  justify-content: space-evenly;
  color: white;
  margin-top: 12px;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  height: 500px;
  padding: 10px;
  background-color: transparent;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  overflow-y: auto;
`;

const Image = styled.img`
  width: 52px;
  height: 52px;
  src: ${({ src }) => src};
`;

const ChatContainer = styled.div`
  display: flex;
  background-color: transparent;
  justify-content: ${({ isMine }) => (isMine ? 'end' : 'start')};
  margin-left: ${({ isMine }) => (isMine ? '0' : '20px')};
  margin-right: ${({ isMine }) => (isMine ? '20px' : '0')};
  margin-top: 10px;
  margin-bottom: 10px;
`;

const ChatBox = styled.div`
  display: flex;
  background-color: ${Common.colors.background_pointer};
  border-radius: 16px;
  min-width: 170px;
  max-width: 550px;
  padding-left: 20px;
  padding-right: 20px;
`;

const ChattingCard = ({
  children,
  width,
  height,
  backgroundColor,
  informations,
  ...props
}) => {
  const getChatLog = () => [
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

  const myId = 1;

  const showChat = logs => {
    return logs.map((log, index) => (
      <ChatContainer isMine={log.id === myId} key={index}>
        <ChatBox>
          <Text>
            {log.name}: {log.chat}
          </Text>
        </ChatBox>
      </ChatContainer>
    ));
  };

  return (
    <Modal width={width} height={height} style={{ padding: 0 }} visible>
      <Header backgroundColor={backgroundColor}>
        <Top>
          <Icons style={{ width: '120px' }}>
            <Icons.ArrowBack fontSize={32}></Icons.ArrowBack>
          </Icons>
          <Title style={{ width: '120px' }}>
            <Image src={'https://picsum.photos/200'} />
            <Text>내이름은 제페토</Text>
          </Title>
          <Icons style={{ width: '120px' }}>
            <Icons.Like
              style={{
                fontSize: '32px',
                color: 'white',
                marginRight: '5px',
              }}></Icons.Like>
            <Text block style={{ color: 'white', marginRight: '5px' }}>
              152
            </Text>
            <Icons.Favorite
              style={{
                fontSize: '32px',
                color: 'white',
                marginRight: '5px',
              }}></Icons.Favorite>
            <Text block style={{ color: 'white', marginRight: '5px' }}>
              51
            </Text>
          </Icons>
        </Top>
        <Hr />
        <FirstHashtags>
          <div>#안녕하세요반갑습니다</div>
          <div>#10글자로만들어봐요</div>
          <div>#우리모두함께놀아봐요</div>
        </FirstHashtags>
        <SecondHashtags>
          <div>#해쉬태그를만들어봐요</div>
          <div>#최대한길게길게갑시다</div>
        </SecondHashtags>
      </Header>
      <Body>{showChat(getChatLog())}</Body>
    </Modal>
  );
};

export default ChattingCard;
