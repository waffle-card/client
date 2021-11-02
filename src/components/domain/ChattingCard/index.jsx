import styled from '@emotion/styled';
import { Text, Modal, Spinner } from '@components';
import Common from '@styles';
import PropTypes from 'prop-types';
import { authApi, cardApi } from '@apis';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import Swal from 'sweetalert2';
import Header from './Header';
import Message from './Message';

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
    height: 650px;
  }

  @media ${Common.media.lg} {
    width: 740px;
    height: 700px;
  }
`;

const HeaderContainer = styled.div`
  min-width: 290px;
  max-width: 740px;
  min-height: 120px;
  max-height: 195px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  box-shadow: ${Common.shadow.chattingHeader};

  @media ${Common.media.sm} {
    width: 290px;
    height: 120px;
    padding: 15px 20px 0 20px;
  }

  @media ${Common.media.md} {
    width: 688px;
    height: 165px;
    padding: 15px 30px 0 30px;
  }

  @media ${Common.media.lg} {
    width: 740px;
    height: 185px;
    padding: 15px 40px 0 40px;
  }
`;

const Hr = styled.hr`
  width: 100%;
  border: none;
  border-bottom: 0.5px solid rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  margin: auto;
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

const StyledText = styled(Text)`
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

const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: transparent;
  background-color: ${Common.colors.background_modal};
  overflow-y: auto;

  @media ${Common.media.sm} {
    width: 290px;
    padding-top: 10px;
    height: 800px;
  }

  @media ${Common.media.md} {
    width: 688px;
    padding: 10px 10px 10px 10px;
    height: 365px;
  }

  @media ${Common.media.lg} {
    width: 740px;
    padding: 10px 10px 10px 10px;
    height: 395px;
  }
`;

const ChatContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  background-color: transparent;
  justify-content: ${({ isMine }) => (isMine ? 'end' : 'start')};
  margin-left: ${({ isMine }) => (isMine ? '0' : '5px')};
  margin-right: ${({ isMine }) => (isMine ? '5px' : '0')};
  margin-top: 10px;
  margin-bottom: 10px;
  box-sizing: border-box;

  @media ${Common.media.sm} {
    padding: 0;
  }

  @media ${Common.media.md} {
    padding: 10px 0 10px 10px;
  }

  @media ${Common.media.lg} {
    padding: 10px 0 10px 10px;
  }
`;

const Footer = styled.div`
  display: flex;
  background-color: ${Common.colors.background_modal};
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  justify-content: center;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
  height: auto;
`;

const InputBox = styled.div`
  display: flex;
  background-color: ${Common.colors.speech_bubble};
  width: 100%;
  border-radius: 16px;
  box-sizing: border-box;
  color: rgba(255, 255, 255, 0.5);
  margin: 0 auto;

  @media ${Common.media.sm} {
    height: 30px;
    border-radius: 8px;
    font-size: 8px;
    padding: 5px 10px 5px 10px;
  }

  @media ${Common.media.md} {
    height: 80px;
    padding: 10px 20px 10px 20px;
  }

  @media ${Common.media.lg} {
    height: 80px;
    padding: 10px 20px 10px 20px;
  }
`;

const Input = styled.textarea`
  background-color: transparent;
  border: none;
  outline: none;
  resize: none;
  color: white;

  @media ${Common.media.sm} {
    width: 100%;
    font-size: 8px;
  }

  @media ${Common.media.md} {
    width: 100%;
    font-size: ${Common.fontSize.base};
  }

  @media ${Common.media.lg} {
    width: 100%;
    font-size: ${Common.fontSize.base};
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
`;

const getDataFromAPI = async postId => {
  try {
    const res = await cardApi.getCard(postId);

    return res;
  } catch (e) {
    console.error(e);
    return;
  }
};

const ChattingCard = ({ children, backgroundColor, visible, ...props }) => {
  const history = useHistory();
  const [cardData, setCardData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState('');
  // const [postId, setPostId] = useState('');
  const [title, setTitle] = useState('');
  const [comments, setComments] = useState([]);
  const [author, setAuthor] = useState('');
  const [meta, setMeta] = useState({});
  const [cardColor, setCardColor] = useState('');
  const [hashTags, setHashTags] = useState([]);

  // API가 필요한 부분
  // const postId = useLocation().state.postId;
  const postId = '618147ff7924de107cd3ea2d';

  useEffect(() => {
    const getCardData = async () => {
      setIsLoading(true);
      // const response = useLocation().state.cardData;
      // const userId = useLocation().state.userId;
      const response = await cardApi.getCard(postId);

      if (!response.data) {
        Swal.fire({
          title: '😢',
          text: '에러가 발생했습니다!',
          confirmButtonColor: Common.colors.point,
        }).then(() => {
          history.push('/');
        });
        setIsLoading(false);
        return;
      }

      const cardData = {
        title: response.data.title,
        comments: response.data.comments,
        author: response.data.author,
        meta: response.data.meta,
      };

      setCardData(cardData);
      setIsLoading(false);
    };

    getCardData();
  }, [history]);
  // const handleInsert = useCallback();

  useEffect(() => {
    setTitle(cardData?.title);
  }, [cardData.title]);

  useEffect(() => {
    setComments(cardData?.comments);
  }, [cardData.comments]);

  useEffect(() => {
    setAuthor(cardData?.author);
  }, [cardData.author]);

  console.log(author);

  const firstHashtags = [
    '#안녕하세요반갑습니다',
    '#10글자로만들어봐요',
    '#우리모두함께놀아봐요',
  ];
  const secondHashtags = ['#해쉬태그를만들어봐요', '#최대한길게길게갑시다'];

  const hashtagsDiv = hashtags =>
    hashtags.map(hashtag => <StyledText block>{hashtag}</StyledText>);

  return (
    <StyledModal
      visible={visible}
      style={{ padding: 0, display: 'flex', flexDirection: 'column' }}>
      <HeaderContainer backgroundColor={cardColor}>
        <Header title={title} authorName={author?.fullName} />
        <Hr />
        <FirstHashtags>{hashtagsDiv(firstHashtags)}</FirstHashtags>
        <SecondHashtags>{hashtagsDiv(secondHashtags)}</SecondHashtags>
      </HeaderContainer>
      <BodyContainer>
        {comments?.map(comment => (
          <ChatContainer
            isMine={comment.author._id === userId}
            key={comment._id}>
            <Message isMine={comment.author._id === userId}>
              <StyledText block>
                {comment.author.fullName} : {comment.comment}
              </StyledText>
            </Message>
          </ChatContainer>
        ))}
      </BodyContainer>
      <Footer>
        <InputBox>
          <Input placeholder="메세지를 입력하세요." />
        </InputBox>
      </Footer>
      <Spinner loading={isLoading} />
    </StyledModal>
  );
};

ChattingCard.propTypes = {
  backgroundColor: PropTypes.string,
  cardData: PropTypes.object,
  visible: PropTypes.bool,
};

ChattingCard.defaultProps = {
  visible: false,
};

export default ChattingCard;
