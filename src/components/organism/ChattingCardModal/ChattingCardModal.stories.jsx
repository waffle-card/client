import { ChattingCardModal } from '@/components';
import React, { useState } from 'react';

const dummyWaffleCard = {
  id: '123',
  userId: '123',
  userName: '윤호',
  emoji: '😎',
  color: 'rgba(57, 219, 178, 1)',
  hashTags: ['안녕', '클레오파트라', '세상에서', '제일가는', '포테이토칩'],
  likeCount: 3,
  createdAt: 'String',
  updatedAt: 'String',
};

const dummyComments = [
  {
    _id: '123',
    userId: '123',
    userName: '유노',
    waffleCardId: '321',
    text: `안녕하세요.
    제 이름은 정윤호 입니다.제 이름제 이름은 정윤호 입니다.제 이름은 정윤호 입니다.
    제 이름은 정윤호 입니다.`,
    createdAt: '123',
    updatedAt: '123String',
    id: '123String',
  },
  {
    _id: '123',
    userId: '123',
    userName: '윤호',
    waffleCardId: '321',
    text: `안녕하세요. 제 이름제 이름도 정윤호 입니다. 신기하네요`,
    createdAt: '123',
    updatedAt: '123String',
    id: '312',
  },
  {
    _id: '123',
    userId: '123',
    userName: '유노',
    waffleCardId: '321',
    text: `안녕하세요.
    제 이름은 정윤호 입니다.제 이름제 이름은 정윤호 입니다.제 이름은 정윤호 입니다.
    제 이름은 정윤호 입니다.`,
    createdAt: '123',
    updatedAt: '123String',
    id: '123Sting',
  },
  {
    _id: '123',
    userId: '312',
    userName: '유노',
    waffleCardId: '321',
    text: `안녕하세요.
    제 이름은 정윤호 입니다.제 이름제 이름은 정윤호 입니다.제 이름은 정윤호 입니다.
    제 이름은 정윤호 입니다.`,
    createdAt: '123',
    updatedAt: '123String',
    id: '123Strin',
  },
];

const dummyUser = {
  id: '123',
  name: '윤호',
  email: '',
};

export default {
  title: 'Component/Domain/ChattingCard',
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
