import Swal from 'sweetalert2';
import { useEffect, useState } from 'react';
import { useModals } from '@/hooks';
import styled from '@emotion/styled';
import { useWaffleCardsDispatch } from '@/contexts';
import { waffleCardApi, commentApi, likeApi } from '@/apis';
import { useLoadingDispatch } from '@/contexts';
import {
  Tab,
  WaffleCardsList,
  ScrollGuide,
  Modals,
  CardEditModal,
  ChattingCardModal,
} from '@/components';

const HomePage = () => {
  const { openModal } = useModals();
  const [tabValue, setTabValue] = useState('total');
  const setLoading = useLoadingDispatch();
  const { setWaffleCardsByType, refreshWaffleCards } = useWaffleCardsDispatch();

  const handleClickWaffleCard = async waffleCard => {
    setLoading(true);

    try {
      const response = await commentApi.getCommentsByWaffleCardId(
        waffleCard.id,
      );
      const commentsData = response.data;
      openModal(ChattingCardModal, {
        visible: true,
        waffleCardData: waffleCard,
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

    setLoading(false);
  };

  const handleClickWaffleCardCreate = async () => {
    openModal(CardEditModal, {
      visible: true,
      onSubmit: async () => {
        await refreshWaffleCards(tabValue);
      },
    });
  };

  const handleClickWaffleCardEdit = waffleCard => {
    openModal(CardEditModal, {
      visible: true,
      editMode: true,
      initialWaffleCardData: waffleCard,
      onSubmit: async () => {
        await refreshWaffleCards(tabValue);
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
          setLoading(true);
          await waffleCardApi.deleteWaffleCard(waffleCardId);
          await refreshWaffleCards(tabValue);
          setLoading(false);
        } catch (error) {
          console.error(
            `in ChattingCardModal : 댓글 삭제 실패 - ${error.message}`,
          );
        }
      }
    });
  };

  const handleClickLikeToggle = async (waffleCardId, likeToggled) => {
    try {
      if (likeToggled) {
        await likeApi.createLike(waffleCardId);
      } else {
        await likeApi.deleteLike(waffleCardId);
      }
    } catch (error) {
      console.error(
        `in ChattingCardModal : 좋아요 삭제 실패 - ${error.message}`,
      );
    }

    await refreshWaffleCards(tabValue);
  };

  useEffect(() => {
    const initWaffleCardsByType = async () => {
      setLoading(true);
      await setWaffleCardsByType(tabValue, { cached: true });
      setLoading(false);
    };

    initWaffleCardsByType();
  }, [setLoading, setWaffleCardsByType, tabValue]);

  return (
    <Container>
      <Tab onClick={setTabValue} currentActiveTabItem={tabValue} />
      <WaffleCardsList
        type={tabValue}
        onClickWaffleCard={handleClickWaffleCard}
        onClickWaffleCardCreate={handleClickWaffleCardCreate}
        onClickWaffleCardEdit={handleClickWaffleCardEdit}
        onClickWaffleCardDelete={handleClickWaffleCardDelete}
        onClickLikeToggle={handleClickLikeToggle}
      />
      <Modals />
      {tabValue === 'total' && <ScrollGuide />}
    </Container>
  );
};

const Container = styled.main`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: calc(100vh - 60px);
  margin: 0 auto;
`;

export default HomePage;
