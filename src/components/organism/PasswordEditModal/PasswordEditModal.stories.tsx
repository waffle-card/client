import { PasswordEditModal, PasswordEditModalProps } from '@/components';

export default {
  title: 'Component/organism/PasswordEditModal',
  component: PasswordEditModal,
  argTypes: {
    visible: {
      defaultValue: 'true',
      control: { type: 'boolean' },
    },
  },
};

export const Default = (args: PasswordEditModalProps) => {
  return <PasswordEditModal {...args} />;
};
