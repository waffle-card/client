import styled from '@emotion/styled';
import { Text } from '@/components';
import Common from '@/styles';

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
