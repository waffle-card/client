import { BackButton, BackButtonProps } from '@/components';

export default {
  title: 'Component/Atom/BackButton',
  component: BackButton,
};

export const Default = ({ ...args }: BackButtonProps) => {
  return <BackButton {...args} />;
};
