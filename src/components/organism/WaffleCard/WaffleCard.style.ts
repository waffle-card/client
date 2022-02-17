import styled from '@emotion/styled';
import Common from '@/styles';
import { Text as RawText, EditBox as RawEditBox } from '@/components';

interface CardProps extends React.ComponentProps<'div'> {
  backgroundColor?: string;
}

export const Card = styled.div<CardProps>`
  position: relative;
  padding: 18px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 265px;
  min-width: 180px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  border-radius: 16px;
  box-shadow: ${Common.shadow.card};
  box-sizing: border-box;
  cursor: pointer;
  @media ${Common.media.sm} {
    width: 180px;
    height: calc(180px * 1.56);
    font-size: ${Common.fontSize.micro};
  }
  @media ${Common.media.md} {
    width: 216px;
    height: calc(216px * 1.56);
    font-size: ${Common.fontSize.small};
  }
  @media ${Common.media.lg} {
    width: 265px;
    height: calc(265px * 1.56);
    font-size: ${Common.fontSize.base};
  }
`;

Card.defaultProps = {
  backgroundColor: Common.colors.indigo,
};

export const Container = styled.div`
  position: relative;
`;

export const EmojiText = styled.p`
  margin: 1rem;
  @media ${Common.media.sm} {
    font-size: 40px;
  }
  @media ${Common.media.md} {
    font-size: 50px;
  }
  @media ${Common.media.lg} {
    font-size: 70px;
  }
`;

export const InfoContainer = styled.div`
  width: 100%;
  height: 18px;
  display: flex;
  justify-content: space-between;
`;

export const Text = styled(RawText)`
  @media ${Common.media.sm} {
    font-size: ${Common.fontSize.small};
  }
  @media ${Common.media.md} {
    font-size: ${Common.fontSize.base};
  }
  @media ${Common.media.lg} {
    font-size: ${Common.fontSize.medium};
  }
`;

export const HashTagWrapper = styled.div`
  display: inline-flex;
  padding: 14px 0;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.18);
  border-radius: 9px;
`;

export const HashTag = styled(Text)`
  width: 90%;
  padding: 0 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  box-sizing: border-box;
  text-align: center;
  font-size: 1rem;
  @media ${Common.media.sm} {
    font-size: ${Common.fontSize.micro};
  }
  @media ${Common.media.md} {
    font-size: ${Common.fontSize.base};
  }
  @media ${Common.media.lg} {
    font-size: ${Common.fontSize.large};
  }
`;

export const EditBox = styled(RawEditBox)`
  position: absolute;
  top: -1rem;
  z-index: 2;
`;
