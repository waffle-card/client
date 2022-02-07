import React from 'react';
import styled from '@emotion/styled';
import { Text } from '@components';

const NoCardGuide = ({ ...props }) => {
  return (
    <TextContainer {...props}>
      <Text>카드목록이 없습니다.</Text>
    </TextContainer>
  );
};

const TextContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
`;

export default NoCardGuide;
