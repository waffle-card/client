import React from 'react';
import styled from '@emotion/styled';
// import Common from '@styles';
const GuideSlider = ({ text, imageUrl }) => {
  return (
    <Container>
      <Title>{text}</Title>
      <Image src={imageUrl}></Image>
    </Container>
  );
};

const Container = styled.div``;
const Title = styled.h1``;
const Image = styled.img``;

export default GuideSlider;
