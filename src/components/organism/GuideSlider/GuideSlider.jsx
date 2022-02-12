// import React, { useState } from 'react';
import Slide from './Slide';
// import Common from '@styles';
const GuideSlider = ({ slideData }) => {
  console.log(Object.entries(slideData));
  // const [slideIndex, setSlideIndex] = useState(1);
  // const handleClickPrev = () => {};
  // const handleClickNext = () => {};
  return (
    <div>
      {Object.entries(slideData).map(([key, { text, url }]) => (
        <Slide key={key} text={text} imageUrl={url}></Slide>
      ))}
    </div>
  );
};

export default GuideSlider;
