import { NameChangeModal } from '@/components';

export default {
  title: 'Component/organism/NameChangeModal',
  component: NameChangeModal,
  argTypes: {
    userName: {
      defaultValue: 'username',
      control: { type: 'text' },
    },
    visible: {
      defaultValue: 'true',
      control: { type: 'boolean' },
    },
  },
};

export const Default = args => {
  return <NameChangeModal {...args} />;
};
