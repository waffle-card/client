import styled from '@emotion/styled';
import Modal from '@components/base/Modal';
import Icons from '@components/base/Icons';
import Text from '@components/base/Text';
import Common from '@styles';
import { useEffect, useState } from 'react';

const Header = styled.div`
  min-height: 200px;
  max-height: 250px;
  padding: 15px 40px 0 40px;
  background-color: royalblue;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  box-shadow: ${Common.shadow.chattingHeader};
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
  min-height: 98px;
  max-height: 400px;
  padding: 10px;
  background-color: transparent;
  background-color: ${Common.colors.background_modal};
  overflow-y: auto;
`;

const Image = styled.img`
  max-width: 52px;
  max-height: 52px;
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
  background-color: ${Common.colors.speech_bubble};
  border-radius: 16px;
  min-width: 170px;
  max-width: 550px;
  padding-left: 20px;
  padding-right: 20px;
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
  informations,
  ...props
}) => {
  // API가 필요한 부분
  const myId = 1;
  const title = '내이름은 제페토';

  const [likeCount, setLikeCount] = useState(0);
  const [favoriteCount, setFavoriteCount] = useState(0);
  const [like, setLike] = useState(false);
  const [favorite, setFavorite] = useState(false);

  const handleLikeClick = () => {
    if (like) {
      setLikeCount(likeCount - 1);
      setLike(false);
    } else {
      setLikeCount(likeCount + 1);
      setLike(true);
    }
  };

  const handleFavoriteClick = () => {
    if (favorite) {
      setFavoriteCount(favoriteCount - 1);
      setFavorite(false);
    } else {
      setFavoriteCount(favoriteCount + 1);
      setFavorite(true);
    }
  };

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

  const firstHashtags = [
    '#안녕하세요반갑습니다',
    '#10글자로만들어봐요',
    '우리모두함께놀아봐요',
  ];
  const secondHashtags = ['#해쉬태그를만들어봐요', '#최대한길게길게갑시다'];

  const hashtagsDiv = hashtags => hashtags.map(hashtag => <div>{hashtag}</div>);

  //

  return (
    <Modal
      width={width}
      height={height}
      style={{ padding: 0, display: 'flex', flexDirection: 'column' }}
      visible>
      <Header height={height} backgroundColor={backgroundColor}>
        <Top>
          <Icons style={{ width: '120px' }}>
            <Icons.ArrowBack fontSize={32}></Icons.ArrowBack>
          </Icons>
          <Title style={{ width: '120px' }}>
            <Image src={'https://picsum.photos/200'} />
            <Text>{title}</Text>
          </Title>
          <Icons style={{ width: '120px' }}>
            <Icons.Like
              active={like}
              onClick={handleLikeClick}
              style={{
                fontSize: '32px',
                color: 'white',
                marginRight: '5px',
              }}></Icons.Like>
            <Text
              block
              style={{ color: 'white', marginRight: '5px', paddingTop: '3px' }}>
              {likeCount}
            </Text>
            <Icons.Favorite
              active={favorite}
              onClick={handleFavoriteClick}
              style={{
                fontSize: '32px',
                color: 'white',
                marginRight: '5px',
              }}></Icons.Favorite>
            <Text
              block
              style={{ color: 'white', marginRight: '5px', paddingTop: '3px' }}>
              {favoriteCount}
            </Text>
          </Icons>
        </Top>
        <Hr />
        <FirstHashtags>{hashtagsDiv(firstHashtags)}</FirstHashtags>
        <SecondHashtags>{hashtagsDiv(secondHashtags)}</SecondHashtags>
      </Header>
      <Body>{showChat(getChatLog())}</Body>
      <Footer>
        <InputBox>
          <Text>메세지를 입력하세요</Text>
        </InputBox>
      </Footer>
    </Modal>
  );
};

export default ChattingCard;
