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
import { useUser } from '@contexts';
import { useModals } from '@hooks';
import Swal from 'sweetalert2';

const HomePage = () => {
  const { openModal } = useModals();
  const { userInfo } = useUser();
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
    console.log('waffleCardId is', waffleCardId);

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
      userData: userInfo,
      commentsData: commentsData ?? [],
      onClickLikeToggle: async (likeToggled, likeCount) => {
        console.log('likeToggled is', likeToggled);

        if (likeToggled) {
          try {
            await likeApi.createLike(waffleCardId);
          } catch (error) {
            Swal.fire({
              icon: 'error',
              text: error.message,
            });
          }
          return;
        } else {
          try {
            await likeApi.deleteLike(waffleCardId);
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
        console.log(text);
        try {
          await commentApi.createComment({ waffleCardId, text });
        } catch (error) {
          Swal.fire({
            icon: 'error',
            text: error.message,
          });
        }
        console.log('댓글 작성!');
      },
      onClickEditComment: async (commentId, text) => {
        console.log(commentId, text);

        // try {
        //   await commentApi.updateComment(commentId, text);
        // } catch (error) {
        //   Swal.fire({
        //     icon: 'error',
        //     text: error.message,
        //   });
        // }
        console.log('댓글 수정!');
      },
      onClickDeleteComment: async commentId => {
        console.log(commentId);
        try {
          await commentApi.deleteComment(commentId);
        } catch (error) {
          Swal.fire({
            icon: 'error',
            text: error.message,
          });
        }
        console.log('댓글 삭제!');
      },
    });
  };

  useEffect(() => {
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
    setIsLoading(true);

    initWaffleCards();

    setIsLoading(false);
  }, [tabValue]);

  useEffect(() => {
    console.log('로딩', isLoading);
  }, [isLoading]);

  return (
    <HomeContainer>
      <Tab onClick={setTabValue} currentActive={tabValue} />
      <CardsContainer
        type={tabValue}
        waffleCardsData={waffleCards}
        onClickWaffleCard={handleClickWaffleCard}
        onClickWaffleCardCreate={handleClickWaffleCardCreate}
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
