import styled from '@emotion/styled';
import { Text, Modal, Spinner, Icons } from '@components';
import Common from '@styles';
import PropTypes from 'prop-types';
import { cardApi } from '@apis';
import { getUserInfoByToken } from '@utils';
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
  justify-content: ${({ length }) =>
    length === 1 ? 'center' : length === 2 ? 'space-evenly' : 'space-between'};
  color: white;
  margin-top: 12px;
  white-space: pre-wrap;
`;

const SecondHashtags = styled.div`
  display: flex;
  justify-content: ${({ length }) =>
    length === 1 ? 'center' : 'space-evenly'};
  color: white;
  margin-top: 12px;
  white-space: pre-wrap;
`;

const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: transparent;
  background-color: ${Common.colors.background_modal};
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 18px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 10px;
    background-clip: padding-box;
    border: 4.8px solid transparent;
    box-shadow: inset 0px 0px 3px white;
  }
  &::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0);
  }

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
  margin-right: 10px;

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

const ChattingCard = ({ children, visible, ...props }) => {
  const history = useHistory();
  const [userInfo, setUserInfo] = useState(null);
  const [cardData, setCardData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [comments, setComments] = useState([]);
  const [author, setAuthor] = useState('');
  const [cardColor, setCardColor] = useState('');
  const [hashTags, setHashTags] = useState([]);
  const textRef = useRef();

  // API가 필요한 부분
  const postId = useLocation().state.cardData.id;

  useEffect(() => {
    const getCardData = async () => {
      setIsLoading(true);
      const response = await cardApi.getCard(postId);
      const userInfo = await getUserInfoByToken();

      if (!response.data) {
        Swal.fire({
          title: '😢',
          text: '에러가 발생했어요!',
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
        cardColor: JSON.parse(response.data.meta).cardColor,
        hashTags: JSON.parse(response.data.meta).hashTags,
      };

      setCardData(cardData);
      setUserInfo(userInfo);
      setIsLoading(false);
    };

    getCardData();
  }, [history, postId]);

  useEffect(() => {
    setTitle(cardData.title);
  }, [cardData.title]);

  useEffect(() => {
    setComments(cardData.comments);
  }, [cardData.comments]);

  useEffect(() => {
    setAuthor(cardData.author);
  }, [cardData.author]);

  useEffect(() => {
    setCardColor(cardData.cardColor);
  }, [cardData.cardColor]);

  useEffect(() => {
    setHashTags(cardData.hashTags);
  }, [cardData.hashTags]);

  // 모달창 닫기 이벤트
  const escFunction = useCallback(
    e => {
      if (e.key === 'Escape') {
        history.goBack();
      }
    },
    [history],
  );

  useEffect(() => {
    document.addEventListener('keydown', escFunction, false);

    return () => {
      document.removeEventListener('keydown', escFunction, false);
    };
  }, [escFunction]);

  // 댓글 생성
  const createComment = async () => {
    let tmpText = textRef.current.value;

    if (tmpText.replace(/ /gi, '') !== 0) {
      if (userInfo) {
        setIsLoading(true);
        await cardApi
          .createCardComment({
            comment: textRef.current.value,
            postId,
          })
          .then(res => {
            setComments([...comments, res.data]);
          })
          .catch(() => {
            Swal.fire({
              title: '😡',
              text: '에러가 발생했어요!!',
              confirmButtonColor: Common.colors.red,
            });
          });
        setIsLoading(false);
        textRef.current.value = '';
      } else {
        Swal.fire({
          title: '😮',
          text: '먼저 로그인을 해주세요!',
          confirmButtonColor: Common.colors.point,
        }).then(() => (textRef.current.value = ''));
      }
    }
  };

  // 스크롤 맨 하단으로 이동
  const ScrollToBottom = () => {
    const scrollRef = useRef();
    useEffect(() => scrollRef.current.scrollIntoView());
    return <div ref={scrollRef} />;
  };

  // enter 키 이벤트
  const handleKeyUp = async e => {
    if (!e.shiftKey && e.key === 'Enter') {
      createComment();
    }
  };

  const handleRemove = commentId => {
    setComments(comments.filter(comment => comment._id !== commentId));
  };

  const hashtagsDiv = (begin, end) =>
    hashTags &&
    hashTags.slice(begin, end).map((hashtag, index) => (
      <StyledText block key={index}>
        {'#' + hashtag}
      </StyledText>
    ));

  return (
    <StyledModal
      visible={visible}
      style={{ padding: 0, display: 'flex', flexDirection: 'column' }}>
      <HeaderContainer backgroundColor={cardColor}>
        {title && author && (
          <Header title={title} authorName={author.fullName} />
        )}
        <Hr />
        <FirstHashtags length={hashtagsDiv(0, 3)?.length}>
          {hashtagsDiv(0, 3)}
        </FirstHashtags>
        <SecondHashtags length={hashtagsDiv(0, 3)?.length}>
          {hashtagsDiv(3, 5)}
        </SecondHashtags>
      </HeaderContainer>
      <BodyContainer>
        {comments &&
          comments.map(comment => (
            <ChatContainer
              isMine={userInfo && comment.author._id === userInfo.id}
              key={comment._id}>
              <Message
                comment={comment}
                onRemove={handleRemove}
                isMine={
                  userInfo && comment.author._id === userInfo.id
                }></Message>
            </ChatContainer>
          ))}
        <ScrollToBottom />
      </BodyContainer>
      <Footer>
        <InputBox>
          <Input
            ref={textRef}
            placeholder="메세지를 입력하세요."
            onKeyUp={handleKeyUp}
          />
          <Icons fontSize="20">
            <Icons.Send onClick={createComment} />
          </Icons>
        </InputBox>
      </Footer>
      <Spinner loading={isLoading} />
    </StyledModal>
  );
};

ChattingCard.propTypes = {
  visible: PropTypes.bool,
};

ChattingCard.defaultProps = {
  visible: false,
};

export default ChattingCard;
