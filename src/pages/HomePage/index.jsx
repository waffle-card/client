import React, { useCallback, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Swal from 'sweetalert2';
import { useModals } from '@hooks';
import { useUser } from '@contexts';
import { waffleCardApi, commentApi, likeApi } from '@apis';
import {
  Tab,
  Spinner,
  CardsContainer,
  ScrollGuide,
  Modals,
  CardEditModal,
  ChattingCardModal,
} from '@components';

const HomePage = () => {
  const { openModal } = useModals();
  const [tabValue, setTabValue] = useState('total');
  const [isLoading, setIsLoading] = useState(true);
  const [waffleCards, setWaffleCards] = useState([]);
  const { userInfo } = useUser();

  const initWaffleCards = useCallback(async () => {
    setIsLoading(true);

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

    if ((tabValue === 'my' || tabValue === 'like') && !userInfo) {
      setWaffleCards(() => []);
      setIsLoading(false);
      return;
    }

    try {
      const response = await waffleCardsCommand[tabValue]();
      const waffleCards = response.data;

      setWaffleCards(() => waffleCards);
    } catch (error) {
      console.error(
        `in HomePage : 와플 카드 전체 목록 가져오기 실패 - ${error.message}`,
      );
      setWaffleCards(() => []);
    }

    setIsLoading(false);
  }, [tabValue, userInfo]);

  const handleClickWaffleCard = async waffleCardId => {
    setIsLoading(true);

    const waffleCardData = waffleCards.find(
      waffleCard => waffleCard.id === waffleCardId,
    );

    try {
      const response = await commentApi.getCommentsByWaffleCardId(waffleCardId);
      const commentsData = response.data;
      openModal(ChattingCardModal, {
        waffleCardData: waffleCardData,
        commentsData: commentsData ?? [],
        onClickLikeToggle: (waffleCardId, likeToggled) => {
          handleClickLikeToggle(waffleCardId, likeToggled);
        },
      });
    } catch (error) {
      console.error(`in HomePage : 댓글 정보 가져오기 실패 - ${error.message}`);
      Swal.fire({
        icon: 'warning',
        text: `카드 정보를 가져오는데 실패했습니다. 잠시후에 다시 시도해주세요.`,
      });
    }

    setIsLoading(false);
  };

  const handleClickWaffleCardCreate = async () => {
    openModal(CardEditModal, {
      onSubmit: () => {
        initWaffleCards();
      },
    });
  };

  const handleClickWaffleCardEdit = waffleCardId => {
    const waffleCardData = waffleCards.find(
      waffleCard => waffleCard.id === waffleCardId,
    );

    openModal(CardEditModal, {
      editMode: true,
      initialWaffleCardData: waffleCardData,
      onSubmit: () => {
        initWaffleCards();
      },
    });
  };

  const handleClickWaffleCardDelete = async waffleCardId => {
    Swal.fire({
      icon: 'question',
      text: '정말 삭제하시겠습니까?',
      showCancelButton: true,
      showCloseButton: true,
      confirmButtonText: '예',
      cancelButtonText: '아니오',
    }).then(async result => {
      if (result.isConfirmed) {
        try {
          await waffleCardApi.deleteWaffleCard(waffleCardId);
          initWaffleCards();
        } catch (error) {
          console.error(
            `in ChattingCardModal : 댓글 삭제 실패 - ${error.message}`,
          );
        }
      }
    });
  };

  const handleClickLikeToggle = async (waffleCardId, likeToggled) => {
    setIsLoading(true);
    if (likeToggled) {
      try {
        await likeApi.createLike(waffleCardId);
      } catch (error) {
        console.error(
          `in ChattingCardModal : 좋아요 생성 실패 - ${error.message}`,
        );
      }
    } else {
      try {
        await likeApi.deleteLike(waffleCardId);
      } catch (error) {
        console.error(
          `in ChattingCardModal : 좋아요 삭제 실패 - ${error.message}`,
        );
      }
    }
    initWaffleCards();
    setIsLoading(true);
  };

  useEffect(() => {
    initWaffleCards();
  }, [initWaffleCards]);

  return (
    <Container>
      <Tab onClick={setTabValue} currentActive={tabValue} />
      <CardsContainer
        type={tabValue}
        waffleCardsData={waffleCards}
        onClickWaffleCard={handleClickWaffleCard}
        onClickWaffleCardCreate={handleClickWaffleCardCreate}
        onClickWaffleCardEdit={handleClickWaffleCardEdit}
        onClickWaffleCardDelete={handleClickWaffleCardDelete}
        onClickLikeToggle={handleClickLikeToggle}
      />
      <Spinner loading={isLoading} />
      <Modals />
      {tabValue === 'total' && <ScrollGuide />}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: calc(100vh - 60px);
  margin: 0 auto;
`;

export default HomePage;
