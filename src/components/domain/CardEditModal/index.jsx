import React, { useCallback, useState } from 'react';
import styled from '@emotion/styled';
import {
  WaffleCard,
  Button,
  ColorPalette,
  Text,
  Modal,
  EmojiPickerActiveButton,
  HashTagInput,
} from '@components';
import Common from '@styles';
import { useDebounce } from '@hooks';

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

const ButtonContainer = styled.div`
  display: flex;
  margin: 16px 0;
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
  }
  @media ${Common.media.md} {
    width: 272px;
    height: 56px;
  }
  @media ${Common.media.lg} {
    width: 340px;
    height: 56px;
  }
`;

const CardEditModal = ({
  visible,
  initialCardData = { id: '' },
  onClose,
  onSubmit,
  ...props
}) => {
  const [cardData, setCard] = useState(initialCardData);
  const [inputValue, setInputValue] = useState('');

  const handleEmojiClick = emoji => {
    setCard(cardData => {
      return { ...cardData, emoji };
    });
  };

  const handleChangeCardColor = e => {
    const { name, value } = e.target;
    setCard(cardData => {
      return { ...cardData, [name]: value };
    });
  };

  const handleClose = e => {
    console.log('닫기!');
    onClose && onClose(e);
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log('제출!');
    onSubmit && onSubmit(e);
  };

  return (
    <StyledModal visible={visible} {...props}>
      <FormContainer onSubmit={handleSubmit} id="cardForm">
        <CardEditContainer>
          <StyledWaffleCard cardData={cardData} />
          <EditContainer>
            <Wrapper>
              <Text>이모지</Text>
              <EmojiPickerActiveButton
                name="emoji"
                type="button"
                onEmojiClick={handleEmojiClick}
              />
            </Wrapper>
            <Wrapper>
              <Text>배경색</Text>
              <ColorPalette name="cardColor" onChange={handleChangeCardColor} />
            </Wrapper>
            <Wrapper>
              <Text>해시태그</Text>
              {/* 아래 input이 왜 포커스 아웃이 될까...? */}
              <input
                type="text"
                onChange={e => {
                  setInputValue(e.target.value);
                }}
              />
              <p>{inputValue}</p>
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
            생성하기
          </StyledButton>
        </ButtonContainer>
      </FormContainer>
    </StyledModal>
  );
};

export default CardEditModal;

// const card = {
//   id: 'tmp',
//   emoji: '👽',
//   cardColor: 'rgba(92, 107, 192, 1)',
//   hashTags: [
//     '지우개방',
//     '쏟아내고가',
//     'ㄴr는 ㄱr끔',
//     '눈물을 흘린ㄷr',
//     '이 해시태그는매우긴해시태그입니다.',
//   ],
// };
