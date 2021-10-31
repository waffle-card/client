import React from 'react';
import styled from '@emotion/styled';
import { useHistory } from 'react-router-dom';

import { Text, Icons } from '@components';

const BackButtonComtainer = styled.div`
  display: flex;
  width: 84px;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const BackButton = () => {
  const history = useHistory();
  return (
    <BackButtonComtainer
      onClick={() => {
        history.goBack();
      }}>
      <Icons.ArrowBack />
      <Text>뒤로가기</Text>
    </BackButtonComtainer>
  );
};

export default BackButton;
