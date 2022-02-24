import { ColorPicker } from '@/components';

export default {
  title: 'Component/Molecule/ColorPicker',
};

export const Default = () => {
  return <ColorPicker />;
};

export const ColorItem = () => {
  return <ColorPicker.ColorItem />;
};
