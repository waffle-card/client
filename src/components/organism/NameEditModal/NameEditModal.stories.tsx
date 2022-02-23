import { NameEditModal, NameEditModalProps } from '@/components';

export default {
  title: 'Component/organism/NameEditModal',
  component: NameEditModal,
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

export const Default = (args: NameEditModalProps) => {
  return <NameEditModal {...args} />;
};
