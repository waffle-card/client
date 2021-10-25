import { ColorPalette } from '@components';

export default {
  title: 'Component/ColorPalette',
};

export const Default = args => {
  return <ColorPalette {...args} />;
};
Default.argTypes = {
  onChange: { action: 'onChange' },
};

export const ColorItem = () => {
  return <ColorPalette.ColorItem />;
};
