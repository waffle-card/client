import React from 'react';
import styled from '@emotion/styled';
import Common from '@styles';

const NotFoundContainer = styled.div`
  height: 100vh;
  background-color: ${Common.colors.background};
`;

const NotFoundText = styled.h1`
  display: flex;
  justify-content: center;
  padding-top: 100px;
  font-size: ${Common.fontSize.large};
  color: ${Common.colors.primary};
`;

const NotFoundPage = () => {
  return (
    <NotFoundContainer>
      <NotFoundText>Page Not Found!</NotFoundText>
    </NotFoundContainer>
  );
};

export default NotFoundPage;
