import React from 'react';
import styled from '@emotion/styled';
import { Text } from '@components';
import Common from '@styles';

const NoCardGuide = ({ ...props }) => {
  return (
    <TextContainer {...props}>
      <StyledText>카드 목록이 없습니다</StyledText>
    </TextContainer>
  );
};

const TextContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 413px;
  @media ${Common.media.sm} {
    height: 300px;
  }
`;

const StyledText = styled(Text)`
  @media ${Common.media.sm} {
    font-size: ${Common.fontSize.micro};
  }
`;

export default NoCardGuide;
