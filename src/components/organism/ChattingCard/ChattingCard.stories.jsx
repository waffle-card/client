import { ChattingCard } from '@components';

export default {
  title: 'Component/Domain/ChattingCard',
  argTypes: {
    visible: {
      defaultValue: true,
      control: { type: 'boolean' },
    },
  },
};

export const Default = args => {
  return <ChattingCard {...args}></ChattingCard>;
};
