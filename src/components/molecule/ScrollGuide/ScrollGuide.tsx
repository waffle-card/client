import React from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import useToggle from '@/hooks/useToggle';
import { scrollGuideArrow } from '@/images';
import Common from '@/styles';
import styled from '@emotion/styled';
import { Text } from '@/components';

const ScrollGuide = ({
  ...props
}: React.ComponentProps<'div'>): JSX.Element => {
  const [isDelete, toggle] = useToggle(false);

  return (
    <Container isDelete={isDelete} {...props}>
      <DelButton onClick={toggle}>
        <ClearIcon style={{ fontSize: '1rem' }} />
      </DelButton>
      <ImgBox>
        <img src={scrollGuideArrow} alt="scrollguide" />
      </ImgBox>
      <StyledText weight={Common.fontWeight.regular}>
        Shift+스크롤로 카드들을 둘러보세요!
      </StyledText>
    </Container>
  );
};

interface ContainerProps extends React.ComponentProps<'div'> {
  isDelete: boolean;
}

export const Container = styled.div<ContainerProps>`
  position: absolute;
  display: none;
  left: 50%;
  bottom: 12%;
  transform: translateX(-50%);
  width: 312px;
  visibility: ${({ isDelete }) => (isDelete ? 'hidden' : 'visible')};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media ${Common.media.lg} {
    display: flex;
  }
`;

export const ImgBox = styled.div`
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

export const StyledText = styled(Text)`
  @media ${Common.media.sm} {
    font-size: 12px;
  }
`;

export const DelButton = styled.div`
  position: absolute;
  padding: 3px;
  display: block;
  top: -1.8rem;
  right: -1.8rem;
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
