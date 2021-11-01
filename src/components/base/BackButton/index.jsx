import React from 'react';
import styled from '@emotion/styled';
import { useHistory } from 'react-router-dom';

import { Text, Icons } from '@components';

const BackButtonContainer = styled.div`
  display: flex;
  width: 84px;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const BackButton = ({ ...props }) => {
  const history = useHistory();
  return (
    <BackButtonContainer
      onClick={() => {
        history.goBack();
      }}
      {...props}>
      <Icons.ArrowBack />
      <Text>뒤로가기</Text>
    </BackButtonContainer>
  );
};

export default BackButton;
