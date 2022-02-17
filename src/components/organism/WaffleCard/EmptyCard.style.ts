import styled from '@emotion/styled';
import Common from '@/styles';
import { Text as RawText } from '@/components';

interface ContainerProps extends React.ButtonHTMLAttributes<HTMLDivElement> {
  backgroundColor?: string;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 265px;
  min-width: 180px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  border: 5px dashed ${Common.colors.secondary};
  border-radius: 16px;
  box-sizing: border-box;
  cursor: pointer;
  transition: all 200ms ease-out;
  &:hover {
    border: 5px dashed ${Common.colors.point};
    p {
      transition: all 200ms ease-out;
      color: ${Common.colors.point};
    }
  }
  @media ${Common.media.sm} {
    width: 180px;
    height: calc(180px * 1.56);
  }
  @media ${Common.media.md} {
    width: 216px;
    height: calc(216px * 1.56);
  }
  @media ${Common.media.lg} {
    width: 265px;
    height: calc(265px * 1.56);
  }
`;

export const Text = styled(RawText)`
  margin-bottom: 6px;
`;
