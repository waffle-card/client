import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Common from '@/styles';

interface ArrowIconsProps extends React.ComponentProps<'div'> {
  width?: number | string;
  visiblePrev?: boolean;
  visibleNext?: boolean;
  onClickPrev?: () => number | void;
  onClickNext?: () => number | void;
}

const ArrowIcons = ({
  width = '100%',
  visiblePrev = true,
  visibleNext = true,
  onClickPrev,
  onClickNext,
  ...props
}: ArrowIconsProps): JSX.Element => {
  return (
    <IconsContainer width={width} {...props}>
      <PrevIcon onClick={onClickPrev} visiblePrev={visiblePrev} />
      <NextIcon onClick={onClickNext} visibleNext={visibleNext} />
    </IconsContainer>
  );
};
export default ArrowIcons;

const IconsContainer = styled.div<ArrowIconsProps>`
  position: absolute;
  top: 50%;
  transform: translateY(-20%);
  width: ${({ width }) => (typeof width === 'number' ? `${width}px` : width)};
  display: flex;
  justify-content: space-between;
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
