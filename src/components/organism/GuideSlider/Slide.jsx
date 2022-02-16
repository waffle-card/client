import React from 'react';
import styled from '@emotion/styled';
import Common from '@/styles';
import PropTypes from 'prop-types';

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
  justify-content: space-between;
  align-items: center;
  width: 70%;
  height: 510px;
  animation: fade 1.4s;
  @keyframes fade {
    from {
      opacity: 0.4;
    }
    to {
      opacity: 1;
    }
  }
  @media ${Common.media.md} {
    width: 80%;
    height: 450px;
  }
  @media ${Common.media.sm} {
    width: 100%;
    height: 300px;
  }
`;

const Title = styled.h1`
  color: #fff;
  font-size: 1.7rem;
  text-align: center;
  line-height: 1.4;
  @media ${Common.media.md} {
    font-size: ${Common.fontSize.large};
  }
  @media ${Common.media.sm} {
    font-size: ${Common.fontSize.small};
  }
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 400px;
  background-color: transparent;
  @media ${Common.media.sm} {
    height: 250px;
  }
`;

const StyledImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center center;
`;

Slide.propTypes = {
  text: PropTypes.string,
  imageUrl: PropTypes.string,
};

Slide.defaultProps = {
  text: '',
  imageUrl: '',
};

export default Slide;
