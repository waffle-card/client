import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Common from '@/styles';

interface ArrowButtonsProps extends React.ComponentProps<'div'> {
  onClickPrev?: () => number | void;
  onClickNext?: () => number | void;
}

const ArrowButtons = ({
  onClickPrev,
  onClickNext,
}: ArrowButtonsProps): JSX.Element => {
  return (
    <>
      <PrevIcon onClick={onClickPrev} />
      <NextIcon onClick={onClickNext} />
    </>
  );
};
export default ArrowButtons;

const moveIconStyle = css`
  position: absolute;
  top: calc(50% + 16px);
  transform: translateY(-50%);
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
    padding: 0.59rem;
    font-size: 1.6rem;
  }
`;

const PrevIcon = styled(ArrowBackIosNewIcon)<ArrowButtonsProps>`
  ${moveIconStyle}
  left:3%;
`;

const NextIcon = styled(ArrowForwardIosIcon)<ArrowButtonsProps>`
  ${moveIconStyle}
  right:3%;
`;
