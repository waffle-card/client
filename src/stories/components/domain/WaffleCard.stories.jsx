import { WaffleCard } from '@components';
import Common from '@styles';

export default {
  title: 'Component/Domain/WaffleCard',
};

export const Default = () => {
  return <WaffleCard />;
};

export const Custom = args => {
  return <WaffleCard {...args} />;
};
Custom.argTypes = {
  myCard: {
    defaultValue: false,
    control: { type: 'boolean' },
  },
  cardData: {
    defaultValue: {
      id: '6172145b54db072125ad91de',
      emoji: '👿',
      cardColor: Common.colors.indigo,
      createdAt: '2021-10-23T00:33:31.554Z',
      favoriteToggle: false,
      favoriteCount: 12,
      likeToggle: true,
      likeCount: 27,
      hashTags: [
        '자랑방',
        '너 뭐 잘났어?',
        '부럽네',
        '이 해시태그는매우긴해시태그입니다.',
      ],
    },
    control: { type: 'object' },
  },
  width: {
    defaultValue: 256,
    control: { type: 'number' },
  },
  height: {
    defaultValue: null,
    control: { type: 'number' },
  },
  onClickCard: {
    action: 'onClickCard',
  },
  onClickLikeIcon: {
    action: 'onClickLikeIcon',
  },
  onClickFavoriteIcon: {
    action: 'onClickFavoriteIcon',
  },
};

export const EditCard = args => {
  return <WaffleCard {...args} />;
};

export const MyCard = args => {
  const card = {
    id: '6172145b54db072125ad91de',
    emoji: '🦁',
    cardColor: Common.colors.purple,
    createdAt: '2021-10-23T00:33:31.554Z',
    favoriteToggle: false,
    favoriteCount: 7,
    likeToggle: true,
    likeCount: 13,
    hashTags: ['나의카드', '마우스 호버', 'EditBox', '생겨요!'],
  };
  return <WaffleCard myCard cardData={card} {...args} />;
};
MyCard.argTypes = {
  onClickCard: {
    action: 'onClickCard',
  },
  onClickLikeIcon: {
    action: 'onClickLikeIcon',
  },
  onClickFavoriteIcon: {
    action: 'onClickFavoriteIcon',
  },
  onClickEditIcon: {
    action: 'onClickEditIcon',
  },
  onClickDeleteIcon: {
    action: 'onClickDeleteIcon',
  },
};

export const TodayCards = args => {
  const card = {
    id: '6172145b54db072125ad91de',
    emoji: '👽',
    cardColor: Common.colors.indigo,
    createdAt: '2021-10-23T00:33:31.554Z',
    favoriteToggle: false,
    favoriteCount: 12,
    likeToggle: true,
    likeCount: 27,
    hashTags: [
      '지우개방',
      '쏟아내고가',
      'ㄴr는 ㄱr끔',
      '눈물을 흘린ㄷr',
      '이 해시태그는매우긴해시태그입니다.',
    ],
  };
  return <WaffleCard cardData={card} {...args} />;
};
