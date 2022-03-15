import styled from '@emotion/styled';
import React, { useState } from 'react';
import Slide from './Slide';
import Common from '@/styles';
import { GUIDE_SLIDE_DATA } from '@/constants';
import { ArrowIcons } from '@/components';

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
      <ArrowIcons onClickPrev={handleClickPrev} onClickNext={handleClickNext} />
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
