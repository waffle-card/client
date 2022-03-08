import { LikeToggle, LikeToggleProps } from '@/components';

export default {
  title: 'Component/Molecule/LikeToggle',
};

export const Default = ({ ...args }: LikeToggleProps) => {
  const handleClick = (toggle: boolean, count: number) => {
    console.log('좋아요 클릭', toggle, count);
  };
  return <LikeToggle interactive onClick={handleClick} {...args} />;
};
