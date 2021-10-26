import { WaffleCard } from '@components';

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

export const Default = args => {
  return <WaffleCard {...args} />;
};

export const Usage = args => {
  return <WaffleCard {...args} />;
};
