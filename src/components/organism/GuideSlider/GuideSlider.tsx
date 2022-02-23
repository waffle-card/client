import styled from '@emotion/styled';
import { css } from '@emotion/react';
import React, { useState } from 'react';
import Slide from './Slide';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Common from '@/styles';
import { GUIDE_SLIDE_DATA } from '@/constants';

const GuideSlider = ({
  ...props
}: React.ComponentProps<'div'>): JSX.Element => {
  const [slideIndex, setSlideIndex] = useState(0);
  const maxLength = Object.keys(GUIDE_SLIDE_DATA).length;

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

  return (
    <Slider {...props}>
      {GUIDE_SLIDE_DATA.map(({ text, url }, index) => (
        <Slide
          key={text}
          text={text}
          imageUrl={url}
          style={{ display: index === slideIndex ? 'flex' : 'none' }}
        />
      ))}
      <Dots>
        {Object.entries(GUIDE_SLIDE_DATA).map(([key, _], index) => (
          <Dot key={key} active={index === slideIndex}></Dot>
        ))}
      </Dots>
      <PrevIcon onClick={handleClickPrev} />
      <NextIcon onClick={handleClickNext} />
    </Slider>
  );
};

const Slider = styled.div`
  position: relative;
  flex-direction: column;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  @media ${Common.media.sm} {
    padding: 0 1rem;
  }
`;

const moveIconStyle = css`
  box-sizing: content-box;
  position: absolute;
  top: 50%;
  transform: translateY(-20%);
  padding: 0.8rem;
  font-size: 2.7rem;
  border-radius: 50px;
  color: ${Common.colors.point};
  background-color: transparent;
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

const PrevIcon = styled(ArrowBackIosNewIcon)`
  ${moveIconStyle}
  left: 10%;
  @media ${Common.media.md} {
    left: 5%;
  }
  @media ${Common.media.sm} {
    left: 5%;
  }
`;

const NextIcon = styled(ArrowForwardIosIcon)`
  ${moveIconStyle}
  right: 10%;
  @media ${Common.media.md} {
    right: 5%;
  }
  @media ${Common.media.sm} {
    right: 5%;
  }
`;

const Dots = styled.ul`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 2.5rem;
`;

const Dot = styled.li<{ active: boolean }>`
  width: 15px;
  height: 15px;
  margin: 2% 4px 0;
  border-radius: 50px;
  background-color: ${({ active }) =>
    active ? Common.colors.point : 'rgba(255,255,255,0.2)'};
  transition: all 0.3s ease;
  @media ${Common.media.sm} {
    width: 8px;
    height: 8px;
  }
`;

export default GuideSlider;
