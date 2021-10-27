import { WaffleCard } from '@components';
import Common from '@styles';

export default {
  title: 'Component/Domain/WaffleCard',
  argTypes: {
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
  },
};

export const EditCard = args => {
  return <WaffleCard {...args} />;
};

// export const MyCard = args => {
//   return <WaffleCard {...args} />;
// };

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
  return <WaffleCard card={card} {...args} />;
};
