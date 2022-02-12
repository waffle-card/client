import styled from '@emotion/styled';
import { css } from '@emotion/react';
import React, { useState } from 'react';
import Slide from './Slide';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Common from '@styles';

const GuideSlider = ({ slideData, maxLength, ...props }) => {
  const [slideIndex, setSlideIndex] = useState(0);

  const handleClickPrev = () => {
    setSlideIndex(state => {
      if (state - 1 < 0) {
        return maxLength - 1;
      } else {
        return state - 1;
      }
    });
  };

  const handleClickNext = () => {
    setSlideIndex(state => {
      if (state + 1 >= maxLength) {
        return 0;
      } else {
        return state + 1;
      }
    });
  };

  console.log(slideIndex);

  return (
    <Slider {...props}>
      {Object.entries(slideData).map(([key, { text, url }], index) => (
        <Slide
          key={key}
          text={text}
          imageUrl={url}
          style={{ display: index === slideIndex ? 'flex' : 'none' }}
        />
      ))}
      <PrevIcon onClick={handleClickPrev} />
      <NextIcon onClick={handleClickNext} />
    </Slider>
  );
};

const Slider = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const moveIconStyle = css`
  box-sizing: content-box;
  position: absolute;
  top: 50%;
  transform: translateY(-20%);
  padding: 1.2rem;
  font-size: 2.7rem;
  border-radius: 50px;
  color: ${Common.colors.point};
  background-color: transparent;
  transition: all 0.4s ease;
  &:hover {
    background-color: rgba(255, 255, 255, 0.25);
    box-shadow: 0 0 2.5px 5px rgb(255, 255, 255, 0.25);
  }
`;

const PrevIcon = styled(ArrowBackIosNewIcon)`
  ${moveIconStyle}
  left: 14%;
`;

const NextIcon = styled(ArrowForwardIosIcon)`
  ${moveIconStyle}
  right: 14%;
`;

export default GuideSlider;
