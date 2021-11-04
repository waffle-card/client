import React, { useCallback, useEffect, useState } from 'react';
import Common from '@styles';
import Swal from 'sweetalert2';
import { cardApi } from '@apis';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { getUserInfoByToken } from '@utils';
import { useHistory, useLocation } from 'react-router-dom';
import {
  Text,
  Modal,
  Button,
  Spinner,
  WaffleCard,
  HashTagInput,
  ColorPalette,
  EmojiPickerActiveButton,
} from '@components';
import { useUser } from '@contexts';

const StyledModal = styled(Modal)`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 16px;
  box-sizing: border-box;
`;

const FormContainer = styled.form``;

const CardEditContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 16px 0;
  @media ${Common.media.sm} {
    flex-direction: column;
  }
`;

const StyledWaffleCard = styled(WaffleCard)`
  margin: 16px;
`;

const EditContainer = styled.div`
  margin: 16px;
`;

const Wrapper = styled.div`
  margin: 16px 0;
`;

const StyledText = styled(Text)`
  margin: 16px 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  margin: 16px;
  justify-content: space-around;
  align-items: center;
  @media ${Common.media.sm} {
    flex-direction: column-reverse;
  }
`;

const StyledButton = styled(Button)`
  margin: 8px;
  @media ${Common.media.sm} {
    width: 290px;
    height: 40px;
    border-radius: 12px;
  }
  @media ${Common.media.md} {
    width: 310px;
    height: 56px;
  }
  @media ${Common.media.lg} {
    width: 340px;
    height: 56px;
  }
`;

const CardEditModal = ({
  editMode,
  initialCardData = {},
  onClose,
  onSubmit,
  ...props
}) => {
  const history = useHistory();
  const location = useLocation();
  const { userInfo } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [cardData, setCardData] = useState(initialCardData);

  const checkLoggedIn = useCallback(async () => {
    setIsLoading(true);
    const userInfo = await getUserInfoByToken();
    if (userInfo) {
      const userId = userInfo.id;
      const response = await cardApi.getUserCardList(userId);
      const userCardList = response.data;
      if (editMode === undefined && userCardList.length >= 1) {
        Swal.fire({
          title: '😝',
          text: '와플카드는 1개만 만들수 있어요! 와플카드를 소중하게 여겨주세요.',
          confirmButtonColor: Common.colors.point,
        }).then(() => {
          history.push('/cards/my');
        });
      }
    } else {
      Swal.fire({
        title: '🤯',
        text: '로그인을 하고 접근해주세요!',
        confirmButtonColor: Common.colors.point,
      }).then(() => {
        history.push('/login');
      });
    }
    setIsLoading(false);
  }, [history, editMode]);

  const initEditCardData = useCallback(async cardId => {
    try {
      const response = await cardApi.getCard(cardId);
      const { cardColor, hashTags } = JSON.parse(response.data.meta);
      const newCardData = {
        cardId: cardId,
        emoji: response.data.title,
        cardColor,
        hashTags,
      };
      setCardData(newCardData);
    } catch (error) {
      Swal.fire({
        title: '😱',
        text: error,
        confirmButtonColor: Common.colors.point,
      });
    }
  }, []);

  useEffect(() => {
    // checkLoggedIn();
    // if (editMode) {
    //   const cardId = location.state.cardId;
    //   initEditCardData(cardId);
    // }
    if (!userInfo) {
      Swal.fire({
        title: '🤯',
        text: '로그인을 하고 접근해주세요!',
        confirmButtonColor: Common.colors.point,
      }).then(() => {
        history.push('/login');
      });
      return;
    }
    if (editMode) {
      const cardId = location.state.cardId;
      initEditCardData(cardId);
    }
  }, [
    checkLoggedIn,
    editMode,
    initEditCardData,
    location.state,
    history,
    userInfo,
  ]);

  const handleEmojiClick = emoji => {
    setCardData(cardData => {
      return { ...cardData, emoji };
    });
  };

  const handleChangeCardColor = e => {
    const { name, value } = e.target;
    setCardData(cardData => {
      return { ...cardData, [name]: value };
    });
  };

  const handleChangeHashTagInput = values => {
    setCardData(cardData => {
      return { ...cardData, hashTags: values };
    });
  };

  const handleClose = e => {
    onClose && onClose(e);
    history.goBack();
  };

  const createCard = async () => {
    try {
      await cardApi.createCard(cardData);
      Swal.fire({
        title: '🥳',
        text: '당신의 와플카드가 생성되었어요!',
        confirmButtonColor: Common.colors.point,
      }).then(() => {
        history.push('/cards/my');
        window.location.reload();
      });
    } catch (error) {
      Swal.fire({
        title: '😱',
        text: error,
        confirmButtonColor: Common.colors.point,
      });
    }
  };

  const editCard = async () => {
    try {
      await cardApi.updateCard(cardData);
      Swal.fire({
        title: '😎',
        text: '당신의 와플카드가 수정되었어요!',
        confirmButtonColor: Common.colors.point,
      }).then(() => {
        history.push('/cards/my');
        window.location.reload();
      });
    } catch (error) {
      Swal.fire({
        title: '😱',
        text: error,
        confirmButtonColor: Common.colors.point,
      });
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (cardData.hashTags.length <= 0) {
      Swal.fire({
        title: '😱',
        text: '최소 1개 이상의 해시태그를 작성해주세요.',
        confirmButtonColor: Common.colors.point,
      });
      return;
    }
    editMode ? editCard() : createCard();

    onSubmit && onSubmit(cardData);
  };

  return (
    <StyledModal visible onClose={onClose} {...props}>
      <FormContainer onSubmit={handleSubmit} id="cardForm">
        <CardEditContainer>
          <StyledWaffleCard cardData={cardData} />
          <EditContainer>
            <Wrapper>
              <StyledText>이모지</StyledText>
              <EmojiPickerActiveButton
                name="emoji"
                type="button"
                onEmojiClick={handleEmojiClick}
              />
            </Wrapper>
            <Wrapper>
              <StyledText>배경색</StyledText>
              <ColorPalette name="cardColor" onChange={handleChangeCardColor} />
            </Wrapper>
            <Wrapper>
              <StyledText>해시태그</StyledText>
              <HashTagInput
                color="white"
                onChange={handleChangeHashTagInput}
              />{' '}
              <StyledText size={14} color="red">
                {cardData.hashTags.length <= 0
                  ? '최소 1개 이상의 해시태그를 작성해주세요.'
                  : null}
                &nbsp;
              </StyledText>
            </Wrapper>
          </EditContainer>
        </CardEditContainer>
        <ButtonContainer>
          <StyledButton
            type="button"
            backgroundColor={Common.colors.primary}
            fontColor={Common.colors.point}
            onClick={handleClose}>
            취소하기
          </StyledButton>
          <StyledButton type="submit" form="cardForm">
            {editMode ? '수정하기' : '생성하기'}
          </StyledButton>
        </ButtonContainer>
      </FormContainer>
      <Spinner loading={isLoading} />
    </StyledModal>
  );
};

CardEditModal.propTypes = {
  visible: PropTypes.bool,
  initialCardData: PropTypes.object,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
};

CardEditModal.defaultProps = {
  visible: false,
  initialCardData: {
    cardId: 'test',
    emoji: '🧇',
    cardColor: Common.colors.yellow,
    hashTags: [],
  },
};

export default CardEditModal;
