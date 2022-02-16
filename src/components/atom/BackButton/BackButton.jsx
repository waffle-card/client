import React from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import Common from '@/styles';
import { Text, Icons } from '@/components';

const BackButtonContainer = styled.div`
  display: flex;
  width: 100%;
  height: 50px;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  background-color: ${Common.colors.background};
`;

const BackButton = ({ ...props }) => {
  const navigate = useNavigate();
  return (
    <BackButtonContainer
      onClick={() => {
        navigate(-1);
      }}
      {...props}
    >
      <Icons.ArrowBack />
      <Text>뒤로가기</Text>
    </BackButtonContainer>
  );
};

export default BackButton;
