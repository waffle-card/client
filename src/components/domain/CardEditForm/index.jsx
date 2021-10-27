import React from 'react';
import styled from '@emotion/styled';
import { WaffleCard, Button, ColorPalette, Text, Modal } from '@components';
import Common from '@styles';

const StyledModal = styled(Modal)`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 918px;
  height: 769px;
  padding: 48px;
  box-sizing: border-box;
`;

const CardEditContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const EditFormContainer = styled.form``;

const InputContainer = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  grid-gap: 8px;
  grid-template-columns: repeat(3, 1fr);
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
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

const CardEditForm = ({ ...props }) => {
  const handleSubmit = e => {
    console.log(e);
  };

  return (
    <StyledModal
      visible
      backgroundColor="rgba(43, 51, 63, 1)"
      width={918}
      height={769}
      {...props}>
      <CardEditContainer>
        <WaffleCard />
        <EditFormContainer submit={handleSubmit}>
          <Text>이모지</Text>
          <Button width={88} height={40}>
            생성하기
          </Button>
          <Text>배경색</Text>
          <ColorPalette />
          <Text>해시태그</Text>
          <InputContainer>
            <Input />
            <Input />
            <Input />
            <Input />
            <Input />
          </InputContainer>
        </EditFormContainer>
      </CardEditContainer>
      <ButtonContainer>
        <Button
          width={339}
          backgroundColor={Common.colors.primary}
          fontColor={Common.colors.point}>
          취소하기
        </Button>
        <Button type="submit" width={339}>
          생성하기
        </Button>
      </ButtonContainer>
    </StyledModal>
  );
};

export default CardEditForm;
