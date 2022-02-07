import React, { useCallback, useEffect, useState } from 'react';
import { Tab, Spinner, CardsContainer, ScrollGuide } from '@components';
import Common from '@styles';
import styled from '@emotion/styled';
import { waffleCardApi } from '@apis';
import { useUser } from '@contexts';
// import Swal from 'sweetalert2';
// import { parseCardInfo } from '@utils';

const HomePage = () => {
  const { userInfo } = useUser();
  const [waffleCards, setWaffleCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleTabClick = tabValue => {
    console.log(tabValue);
  };

  return (
    <HomeContainer>
      <Tab onClick={handleTabClick} />
      <CardsContainer cardList={waffleCards} userInfo={userInfo} />
      <ScrollGuide class="scroll_guide" />
      <Spinner loading={isLoading} />
    </HomeContainer>
  );
};

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  padding: 10px 50px;
  @media ${Common.media.sm} {
    padding: 10px 16px;
  }
  height: calc(100vh - 60px);
  margin: 0 auto;
`;

export default HomePage;
