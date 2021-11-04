import styled from '@emotion/styled';
import React from 'react';
import { Text } from '@components';
import Common from '@styles';

const Container = styled.div`
  width: 312px;
  margin: 14px auto 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media ${Common.media.sm} {
    width: 212px;
  }
`;

const ImgBox = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-top: calc(15 / 312 * 100%);
  margin-bottom: 14px;
  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  @media ${Common.media.sm} {
    margin-bottom: 10px;
  }
`;

const StyledText = styled(Text)`
  @media ${Common.media.sm} {
    font-size: ${Common.fontSize.small};
  }
`;

const ScrollGuide = () => {
  return (
    <Container>
      <ImgBox>
        <img
          src={require('./scroll_guide_icon.png').default}
          alt="scrollguide"
        />
      </ImgBox>
      <StyledText weight={Common.fontWeight.regular}>
        스크롤해서 카드들을 둘러보세요!
      </StyledText>
    </Container>
  );
};

export default ScrollGuide;
