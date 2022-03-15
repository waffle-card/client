import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Common from '@/styles';

interface ArrowIconsProps extends React.ComponentProps<'div'> {
  width?: string | number;
  visible?: boolean;
  visiblePrev?: boolean;
  visibleNext?: boolean;
  onClickPrev?: () => number | void;
  onClickNext?: () => number | void;
}

const ArrowIcons = ({
  width = '80%',
  visible = true,
  visiblePrev = true,
  visibleNext = true,
  onClickPrev,
  onClickNext,
  ...props
}: ArrowIconsProps): JSX.Element => {
  return (
    <IconsContainer {...props} width={width} visible={visible}>
      <PrevIcon
        onClick={onClickPrev}
        visiblePrev={!visible ? false : visiblePrev}
      />
      <NextIcon
        onClick={onClickNext}
        visibleNext={!visible ? false : visibleNext}
      />
    </IconsContainer>
  );
};
export default ArrowIcons;

const IconsContainer = styled.div<ArrowIconsProps>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: space-between;
  width: ${({ width }) => (typeof width === 'number' ? `${width}px` : width)};
  z-index: 2;
  @media ${Common.media.lg} {
    visibility: ${({ visible }) => (visible ? 'visible' : 'hidden')};
  }
  @media ${Common.media.md} {
    width: 90%;
  }
  @media ${Common.media.sm} {
    width: 90%;
  }
`;

const moveIconStyle = css`
  box-sizing: content-box;
  padding: 1rem;
  font-size: 2.7rem;
  border-radius: 50px;
  color: ${Common.colors.point};
  background-color: rgba(255, 255, 255, 0.08);
  transition: all 0.4s ease;
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
    box-shadow: 0 0 2px 5px rgb(255, 255, 255, 0.2);
  }
  @media ${Common.media.sm} {
    padding: 0.3rem;
    font-size: 1.2rem;
  }
`;

const PrevIcon = styled(ArrowBackIosNewIcon)<ArrowIconsProps>`
  ${moveIconStyle}
  visibility: ${({ visiblePrev }) => (visiblePrev ? 'visible' : 'hidden')};
`;

const NextIcon = styled(ArrowForwardIosIcon)<ArrowIconsProps>`
  ${moveIconStyle}
  visibility: ${({ visibleNext }) => (visibleNext ? 'visible' : 'hidden')};
`;
