import React from 'react';
import styled from '@emotion/styled';
import {
  WaffleCard,
  Button,
  ColorPalette,
  Text,
  Modal,
  EmojiPicker,
} from '@components';
import Common from '@styles';
import { useForm } from '@hooks';

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

const InputContainer = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  grid-gap: 8px;
  grid-template-columns: repeat(3, 1fr);
  @media ${Common.media.sm} {
    grid-template-columns: repeat(2, 1fr);
  }
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
  }
  @media ${Common.media.md} {
    width: 272px;
  }
  @media ${Common.media.lg} {
    width: 340px;
  }
`;

const Input = styled.input`
  display: block;
  padding: 6px, 8px;
  width: 114px;
  height: 40px;
  font-size: 14px;
  color: white;
  border-radius: 4px;
  border: 2px solid white;
  background-color: transparent;
  box-sizing: border-box;
`;

const sleep = () => {
  return new Promise(resolve => {
    setTimeout(() => resolve(), 2000);
  });
};

const CardEditForm = ({ ...props }) => {
  const { isLoading, errors, handleChange, handleSubmit } = useForm({
    initialValue: {
      emoji: '',
      cardColor: '',
      hashTags: [],
    },
    onSubmit: async values => {
      await sleep();
      alert(JSON.stringify(values));
    },
    validate: ({ emoji, cardColor }) => {
      const errors = {};
      // if (!emoji) errors.emoji = '이모지를 선택해주세요';
      if (!cardColor) errors.cardColor = '카드 색상을 선택해주세요';
      return errors;
    },
  });

  // const handleSubmit = e => {
  //   const [name, value] = e.target;
  //   console.log('name: ', name);
  //   console.log('value: ', value);
  //   e.preventDefault();
  //   console.log('서브밋!!');
  //   console.log(e.target);
  // };

  const card = {
    id: 'tmp',
    emoji: '👽',
    cardColor: 'rgba(92, 107, 192, 1)',
    hashTags: [
      '지우개방',
      '쏟아내고가',
      'ㄴr는 ㄱr끔',
      '눈물을 흘린ㄷr',
      '이 해시태그는매우긴해시태그입니다.',
    ],
  };

  return (
    <StyledModal visible backgroundColor="rgba(43, 51, 63, 1)" {...props}>
      <FormContainer onSubmit={handleSubmit} id="cardForm">
        <CardEditContainer>
          <StyledWaffleCard card={card} />
          <EditContainer>
            <Wrapper>
              <Text block>이모지</Text>
              <EmojiPicker name="emoji" type="button" onChange={handleChange} />
              {errors.emoji}
            </Wrapper>
            <Wrapper>
              <Text block>배경색</Text>
              <ColorPalette name="cardColor" onChange={handleChange} />
              {errors.cardColor}
            </Wrapper>
            <Wrapper>
              <Text block>해시태그</Text>
              <InputContainer>
                <Input />
                <Input />
                <Input />
                <Input />
                <Input />
              </InputContainer>
            </Wrapper>
          </EditContainer>
        </CardEditContainer>
        <ButtonContainer>
          <StyledButton
            type="button"
            backgroundColor={Common.colors.primary}
            fontColor={Common.colors.point}>
            취소하기
          </StyledButton>
          <StyledButton type="submit" form="cardForm">
            {isLoading ? '생성중...' : '생성하기'}
          </StyledButton>
        </ButtonContainer>
      </FormContainer>
    </StyledModal>
  );
};

export default CardEditForm;
