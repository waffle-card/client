import React from 'react';
import styled from '@emotion/styled';

const Slide = ({ text, imageUrl, ...props }) => {
  return (
    <Container {...props}>
      <Title>{text}</Title>
      <ImageContainer>
        <StyledImg src={imageUrl} />
      </ImageContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 70%;
  animation: fade 1.4s;
  @keyframes fade {
    from {
      opacity: 0.4;
    }
    to {
      opacity: 1;
    }
  }
`;

const Title = styled.h1`
  color: #fff;
  font-size: 1.7rem;
  margin-bottom: 5.2rem;
  text-align: center;
`;

const ImageContainer = styled.div`
  width: 80%;
  height: 550px;
  background-color: transparent;
`;

const StyledImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center center;
`;

export default Slide;
