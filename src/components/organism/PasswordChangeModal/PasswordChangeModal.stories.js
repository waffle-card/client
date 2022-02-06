import { PasswordChangeModal } from '@components';

export default {
  title: 'Component/organism/PasswordChangeModal',
  component: PasswordChangeModal,
  argTypes: {
    visible: {
      defaultValue: 'true',
      control: { type: 'boolean' },
    },
  },
};

export const Default = args => {
  return <PasswordChangeModal {...args} />;
};
