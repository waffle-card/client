import ChattingCard from '@components/domain/ChattingCard';
import Common from '@styles';

export default {
  title: 'Component/Domain/ChattingCard',
  argTypes: {
    visible: {
      defaultValue: false,
      control: { type: 'boolean' },
    },
  },
};

export const Default = args => {
  return (
    <ChattingCard
      backgroundColor={Common.colors.background_modal}
      {...args}></ChattingCard>
  );
};
