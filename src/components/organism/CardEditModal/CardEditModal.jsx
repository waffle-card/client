import React, { useState } from 'react';
import Common from '@/styles';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { waffleCardApi } from '@/apis';
import {
  Text,
  Modal,
  Button,
  Spinner,
  WaffleCard,
  ColorPicker,
} from '@/components';
import EmojiPickerActiveButton from './EmojiPickerActiveButton';
import HashTagsInputs from './HashTagsInputs';
import Swal from 'sweetalert2';

// TODO(윤호): visible 삭제하기
const CardEditModal = ({
  visible,
  editMode,
  initialWaffleCardData,
  onSubmit,
  onClose,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [waffleCard, setWaffleCard] = useState(initialWaffleCardData);

  const createWaffleCard = async () => {
    setIsLoading(true);
    try {
      await waffleCardApi.createWaffleCard({
        emoji: waffleCard.emoji,
        color: waffleCard.color,
        hashTags: waffleCard.hashTags,
      });
    } catch (error) {
      console.error(`in CardEditModal: ${error.message}`);
    }
    setIsLoading(false);
    Swal.fire({
      icon: 'success',
      text: '생성이 완료되었습니다.',
    }).then(() => {
      onClose && onClose();
    });
    onSubmit && onSubmit();
  };

  const updateWaffleCard = async () => {
    if (waffleCard.hashTags.length <= 0) return;
    setIsLoading(true);
    try {
      await waffleCardApi.updateWaffleCard(waffleCard.id, {
        emoji: waffleCard.emoji,
        color: waffleCard.color,
        hashTags: waffleCard.hashTags,
      });
    } catch (error) {
      console.error(`in CardEditModal: ${error.message}`);
    }
    setIsLoading(false);
    Swal.fire({
      icon: 'success',
      text: '수정이 완료되었습니다.',
    }).then(() => {
      onClose && onClose();
    });
    onSubmit && onSubmit();
  };

  const handleSubmit = async e => {
    e.preventDefault();
    editMode ? updateWaffleCard() : createWaffleCard();
  };

  const handleChangeEmoji = emoji => {
    setWaffleCard(waffleCard => {
      return { ...waffleCard, emoji };
    });
  };

  const handleChangeColor = color => {
    setWaffleCard(waffleCard => {
      return { ...waffleCard, color };
    });
  };

  const handleChangeHashTags = hashTags => {
    setWaffleCard(waffleCard => {
      return { ...waffleCard, hashTags };
    });
  };

  const handleClose = () => {
    onClose && onClose();
  };

  return (
    <StyledModal visible hi={'hi'} onClose={handleClose} {...props}>
      <FormContainer onSubmit={handleSubmit} id="cardForm">
        <CardEditContainer>
          <WaffleCard type="plain" waffleCardData={waffleCard} />
          <EditContainer>
            <Wrapper>
              <StyledText>이모지</StyledText>
              <EmojiPickerActiveButton
                name="emoji"
                type="button"
                onEmojiClick={handleChangeEmoji}
              />
            </Wrapper>
            <Wrapper>
              <StyledText>배경색</StyledText>
              <ColorPicker name="color" onChange={handleChangeColor} />
            </Wrapper>
            <Wrapper>
              <StyledText>해시태그</StyledText>
              <HashTagsInputs
                color="white"
                initHashTags={waffleCard.hashTags}
                onChange={handleChangeHashTags}
              />
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
            onClick={handleClose}
          >
            취소하기
          </StyledButton>
          <StyledButton type="submit" form="cardForm">
            {editMode ? '수정하기' : '생성하기'}
          </StyledButton>
        </ButtonContainer>
      </FormContainer>
      {isLoading && <Spinner loading={isLoading} />}
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
  initialWaffleCard: PropTypes.object,
  onClose: PropTypes.func,
};

CardEditModal.defaultProps = {
  visible: false,
  initialWaffleCardData: {
    id: 'test',
    emoji: '🧇',
    color: Common.colors.yellow,
    hashTags: [],
  },
};

export default CardEditModal;
