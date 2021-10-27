import ChattingCard from '@components/domain/ChattingCard';
import Common from '@styles';

export default {
  title: 'Component/Domain/ChattingCard',
};

export const Default = () => {
  return (
    <ChattingCard
      width="740px"
      height="800px"
      backgroundColor={Common.colors.background_modal}></ChattingCard>
  );
};
