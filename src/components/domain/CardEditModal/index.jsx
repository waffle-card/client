import React, { useState } from 'react';
import styled from '@emotion/styled';
import Common from '@styles';
import PropTypes from 'prop-types';
import {
  Button,
  ColorPalette,
  Text,
  Modal,
  EmojiPickerActiveButton,
  HashTagInput,
} from '@components';
import WaffleCard from 'src/components/domain/WaffleCard';

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
  visible,
  initialCardData,
  onClose,
  onSubmit,
  ...props
}) => {
  const [cardData, setCard] = useState(initialCardData);

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

  const handleChangeHashTagInput = values => {
    setCard(cardData => {
      return { ...cardData, hashTags: values };
    });
  };

  const handleClose = e => {
    onClose && onClose(e);
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit && onSubmit(cardData);
  };

  return (
    <StyledModal visible={visible} onClose={onClose} {...props}>
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
              <HashTagInput
                color="white"
                onChange={handleChangeHashTagInput}
              />{' '}
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

CardEditModal.propTypes = {
  visible: PropTypes.bool,
  initialCardData: PropTypes.object,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
};

CardEditModal.defaultProps = {
  visible: false,
};

export default CardEditModal;
