import { EditBox } from '@components';

export default {
  title: 'Component/Domain/EditBox',
  argTypes: {
    backgroundColor: { defaultValue: '#3E4857', control: 'color' },
    fontColor: { defaultValue: 'white', control: 'color' },
  },
};

export const Default = () => {
  return <EditBox />;
};
