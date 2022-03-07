import { ColorPicker, ColorPickerProps } from '@/components';

export default {
  title: 'Component/Molecule/ColorPicker',
};

export const Default = ({ ...args }: ColorPickerProps) => {
  return <ColorPicker {...args} />;
};

export const ColorItem = ({ ...args }: typeof ColorPicker.ColorItem) => {
  return <ColorPicker.ColorItem {...args} />;
};
