import { CardEditForm, HashTagInput } from '@components';

export default {
  title: 'Component/Domain/CardEditForm',
};

export const Default = () => {
  return <CardEditForm />;
};

export const HashTag = args => {
  return <HashTagInput {...args} />;
};
HashTag.argTypes = {
  onChange: { action: 'onChange' },
};
