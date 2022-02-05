import React, { useCallback, useEffect, useState } from 'react';
import Common from '@styles';
import Swal from 'sweetalert2';
import { cardApi, waffleCardApi } from '@apis';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
// import { parseCardInfo } from '@utils';
// import { getUserInfoByToken } from '@utils';
import { useHistory } from 'react-router-dom';
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
// import { useUser } from '@contexts';

// {
// "id": String,
// "emoji": "👽",
// "color": "#123456",
// "hashTags": ["안녕", "클레오파트라", "세상에서", "제일가는", "포테이토칩"]
// }

const CardEditModal = ({
  editMode,
  initialWaffleCard,
  waffleCardId,
  onClose,
  onSubmit,
  ...props
}) => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [waffleCard, setWaffleCard] = useState(() => {
    return (
      initialWaffleCard || {
        id: 'test',
        emoji: '🧇',
        color: Common.colors.yellow,
        hashTags: [],
      }
    );
  });

  const initEditCardData = useCallback(async cardId => {
    setIsLoading(true);
    try {
      const response = await cardApi.getCard(cardId);
      const { id, emoji, color, hashTags } = response.data;

      setWaffleCard(() => ({ id, emoji, color, hashTags }));
    } catch (error) {
      Swal.fire({
        title: '😱',
        text: error.message,
        confirmButtonColor: Common.colors.point,
      });
    }
    setIsLoading(false);
  }, []);

  const handleEmojiClick = emoji => {
    setWaffleCard(waffleCard => {
      return { ...waffleCard, emoji };
    });
  };

  const handleChangeCardColor = e => {
    const { name, value } = e.target;

    setWaffleCard(waffleCard => {
      return { ...waffleCard, [name]: value };
    });
  };

  const handleChangeHashTagInput = values => {
    setWaffleCard(waffleCard => {
      return { ...waffleCard, hashTags: values };
    });
  };

  const handleClose = e => {
    onClose && onClose(e);
    history.goBack();
  };

  const createCard = async () => {
    try {
      await waffleCardApi.createWaffleCard(waffleCard);
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
        text: error.message,
        confirmButtonColor: Common.colors.point,
      });
    }
  };

  const editCard = async () => {
    try {
      await waffleCardApi.updateWaffleCard(waffleCard);
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
        text: error.message,
        confirmButtonColor: Common.colors.point,
      });
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (waffleCard.hashTags.length <= 0) {
      Swal.fire({
        title: '😱',
        text: '최소 1개 이상의 해시태그를 작성해주세요.',
        confirmButtonColor: Common.colors.point,
      });

      return;
    }
    editMode ? editCard() : createCard();

    onSubmit && onSubmit(waffleCard);
  };

  useEffect(() => {
    if (editMode && !waffleCardId) {
      console.error('CardEditModal: waffleCardId is required');
      return;
    }
    initEditCardData(waffleCardId);
  }, [editMode, waffleCardId, initEditCardData]);

  return (
    <StyledModal visible onClose={onClose} {...props}>
      <FormContainer onSubmit={handleSubmit} id="cardForm">
        <CardEditContainer>
          <StyledWaffleCard cardData={waffleCard} />
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
                {waffleCard.hashTags.length <= 0
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

CardEditModal.propTypes = {
  visible: PropTypes.bool,
  initialCardData: PropTypes.object,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
};

CardEditModal.defaultProps = {
  visible: false,
  initialCardData: {
    id: 'test',
    emoji: '🧇',
    color: Common.colors.yellow,
    hashTags: [],
  },
};

export default CardEditModal;
