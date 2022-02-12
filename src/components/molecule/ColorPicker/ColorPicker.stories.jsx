import { ColorPicker } from '@components';

export default {
  title: 'Component/Base/ColorPicker',
};

export const Default = args => {
  return <ColorPicker {...args} />;
};
Default.argTypes = {
  onChange: { action: 'onChange' },
};

export const ColorItem = () => {
  return <ColorPicker.ColorItem />;
};
