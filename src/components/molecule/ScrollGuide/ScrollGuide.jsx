import styled from '@emotion/styled';
import React from 'react';
import { Text, Icons } from '@components';
import Common from '@styles';
import useToggle from '@hooks/useToggle';

const ScrollGuide = ({ tabStatus, ...props }) => {
  const [isDelete, toggle] = useToggle(false);

  return (
    <Container isDelete={isDelete} {...props}>
      <DelButton className="del_Button" onClick={toggle}>
        <Icons fontSize={'10px'}>
          <Icons.Delete></Icons.Delete>
        </Icons>
      </DelButton>
      <ImgBox>
        <img
          src={require('./scroll_guide_icon.png').default}
          alt="scrollguide"
        />
      </ImgBox>
      <StyledText weight={Common.fontWeight.regular}>
        Shift+스크롤로 카드들을 둘러보세요!
      </StyledText>
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  display: flex;
  left: 50%;
  bottom: 12%;
  transform: translateX(-50%);
  width: 312px;
  visibility: ${({ isDelete }) => (isDelete ? 'hidden' : 'visible')};
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
    font-size: 12px;
  }
`;

const DelButton = styled.div`
  position: absolute;
  padding: 3px;
  display: block;
  top: -24px;
  right: -24px;
  border-radius: 50px;
  background-color: rgba(255, 255, 255, 0.15);
  &:hover {
    background-color: rgba(255, 255, 255, 0.35);
  }
  @media ${Common.media.sm} {
    top: -16px;
    right: -16px;
  }

  @media ${Common.media.md} {
    top: -20px;
    right: -20px;
  }
`;

export default ScrollGuide;
