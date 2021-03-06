import { ChattingCardModal } from '@/components';
import React, { useState } from 'react';

const dummyWaffleCard = {
  id: '123',
  userId: '123',
  userName: 'μ€νΈ',
  emoji: 'π',
  color: 'rgba(57, 219, 178, 1)',
  hashTags: ['μλ', 'ν΄λ μ€ννΈλΌ', 'μΈμμμ', 'μ μΌκ°λ', 'ν¬νμ΄ν μΉ©'],
  likeCount: 3,
  createdAt: 'String',
  updatedAt: 'String',
};

const dummyComments = [
  {
    _id: '123',
    userId: '123',
    userName: 'μ λΈ',
    waffleCardId: '321',
    text: `μλνμΈμ.
    μ  μ΄λ¦μ μ μ€νΈ μλλ€.μ  μ΄λ¦μ  μ΄λ¦μ μ μ€νΈ μλλ€.μ  μ΄λ¦μ μ μ€νΈ μλλ€.
    μ  μ΄λ¦μ μ μ€νΈ μλλ€.`,
    createdAt: '123',
    updatedAt: '123String',
    id: '123String',
  },
  {
    _id: '123',
    userId: '123',
    userName: 'μ€νΈ',
    waffleCardId: '321',
    text: `μλνμΈμ. μ  μ΄λ¦μ  μ΄λ¦λ μ μ€νΈ μλλ€. μ κΈ°νλ€μ`,
    createdAt: '123',
    updatedAt: '123String',
    id: '312',
  },
  {
    _id: '123',
    userId: '123',
    userName: 'μ λΈ',
    waffleCardId: '321',
    text: `μλνμΈμ.
    μ  μ΄λ¦μ μ μ€νΈ μλλ€.μ  μ΄λ¦μ  μ΄λ¦μ μ μ€νΈ μλλ€.μ  μ΄λ¦μ μ μ€νΈ μλλ€.
    μ  μ΄λ¦μ μ μ€νΈ μλλ€.`,
    createdAt: '123',
    updatedAt: '123String',
    id: '123Sting',
  },
  {
    _id: '123',
    userId: '312',
    userName: 'μ λΈ',
    waffleCardId: '321',
    text: `μλνμΈμ.
    μ  μ΄λ¦μ μ μ€νΈ μλλ€.μ  μ΄λ¦μ  μ΄λ¦μ μ μ€νΈ μλλ€.μ  μ΄λ¦μ μ μ€νΈ μλλ€.
    μ  μ΄λ¦μ μ μ€νΈ μλλ€.`,
    createdAt: '123',
    updatedAt: '123String',
    id: '123Strin',
  },
];

const dummyUser = {
  id: '123',
  name: 'μ€νΈ',
  email: '',
};

export default {
  title: 'Component/Organism/ChattingCard',
};

export const Default = args => {
  const [visible, setVisible] = useState(false);

  const handleClose = () => {
    console.log('handleClose');
    setVisible(false);
  };

  const handleClickLikeToggle = (likeToggled, likeCount) => {
    console.log('handleClickLikeToggle', likeToggled, likeCount);
  };

  const handleSubmitComment = text => {
    console.log('handleSubmitComment', text);
  };

  const handleClickEditComment = commentId => {
    console.log('handleClickEditComment', commentId);
  };

  const handleClickDeleteComment = commentId => {
    console.log('handleClickDeleteComment', commentId);
  };

  return (
    <>
      <button onClick={() => setVisible(true)}>Show ChattingCard</button>
      <ChattingCardModal
        visible={visible}
        waffleCardData={dummyWaffleCard}
        userData={dummyUser}
        commentsData={dummyComments}
        onClose={handleClose}
        onClickLikeToggle={handleClickLikeToggle}
        onSubmitComment={handleSubmitComment}
        onClickEditComment={handleClickEditComment}
        onClickDeleteComment={handleClickDeleteComment}
        {...args}
      />
    </>
  );
};
