import React, { useEffect, useState } from 'react';
import Common from '@styles';
import styled from '@emotion/styled';
import { waffleCardApi, commentApi, likeApi } from '@apis';
import {
  Tab,
  Spinner,
  CardsContainer,
  ScrollGuide,
  Modals,
  CardEditModal,
  ChattingCard,
} from '@components';
import { useModals } from '@hooks';
import Swal from 'sweetalert2';

const HomePage = () => {
  const { openModal } = useModals();
  const [tabValue, setTabValue] = useState('total');
  const [isLoading, setIsLoading] = useState(true);
  const [waffleCards, setWaffleCards] = useState([]);

  const handleClickWaffleCardCreate = async () => {
    openModal(CardEditModal, {
      onSubmit: async () => {
        console.log('비즈니스 로직 처리');
      },
    });
  };

  const handleClickWaffleCard = async waffleCardId => {
    const waffleCardData = waffleCards.find(
      waffleCard => waffleCard.id === waffleCardId,
    );

    let commentsData;
    try {
      const response = await commentApi.getCommentsByWaffleCardId(waffleCardId);
      commentsData = response.data;
    } catch (error) {
      console.error('in HomePage : 댓글 정보 가져오기 실패');
    }

    openModal(ChattingCard, {
      waffleCardData: waffleCardData,
      commentsData: commentsData ?? [],
      onClickLikeToggle: async likeToggled => {
        if (likeToggled) {
          try {
            await likeApi.createLike(waffleCardData.id);
          } catch (error) {
            Swal.fire({
              icon: 'error',
              text: error.message,
            });
          }
          return;
        } else {
          try {
            await likeApi.deleteLike(waffleCardData.id);
          } catch (error) {
            Swal.fire({
              icon: 'error',
              text: error.message,
            });
          }
          return;
        }
      },
      onSubmitComment: async text => {
        try {
          await commentApi.createComment({ waffleCardId, text });
        } catch (error) {
          Swal.fire({
            icon: 'error',
            text: error.message,
          });
        }
      },
      onClickEditComment: async (commentId, text) => {
        // try {
        //   await commentApi.updateComment(commentId, text);
        // } catch (error) {
        //   Swal.fire({
        //     icon: 'error',
        //     text: error.message,
        //   });
        // }
      },
      onClickDeleteComment: async commentId => {
        try {
          await commentApi.deleteComment(commentId);
        } catch (error) {
          Swal.fire({
            icon: 'error',
            text: error.message,
          });
        }
      },
    });
  };

  const handleClickEdit = waffleCardId => {
    console.log('waffleCardId is', waffleCardId);

    const waffleCardData = waffleCards.find(
      waffleCard => waffleCard.id === waffleCardId,
    );
    console.log('waffleCardData is', waffleCardData);
    openModal(CardEditModal, {
      editMode: true,
      onSubmit: async () => {
        console.log('비즈니스 로직 처리');
      },
      initialWaffleCardData: waffleCardData,
    });
  };

  const handleClickDelete = waffleCardId => {
    try {
    } catch (error) {}
  };

  useEffect(() => {
    setIsLoading(true);

    const initWaffleCards = async () => {
      const waffleCardsCommand = {
        total: () => {
          return waffleCardApi.getWaffleCards();
        },
        my: () => {
          return waffleCardApi.getMyWaffleCard();
        },
        like: () => {
          return waffleCardApi.getMyLikedWaffleCards();
        },
      };

      try {
        const response = await waffleCardsCommand[tabValue]();
        const waffleCards = response.data;

        setWaffleCards(() => waffleCards);
      } catch (error) {
        console.error(error.message);
        setWaffleCards(() => []);
      }
    };

    initWaffleCards();

    setIsLoading(false);
  }, [tabValue]);

  return (
    <HomeContainer>
      <Tab onClick={setTabValue} currentActive={tabValue} />
      <CardsContainer
        type={tabValue}
        waffleCardsData={waffleCards}
        onClickWaffleCard={handleClickWaffleCard}
        onClickWaffleCardCreate={handleClickWaffleCardCreate}
        onClickWaffleCardEdit={handleClickEdit}
      />
      <ScrollGuide class="scroll_guide" />
      <Spinner loading={isLoading} />
      <Modals />
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
