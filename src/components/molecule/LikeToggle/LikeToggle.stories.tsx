import { LikeToggle } from '@/components';

export default {
  title: 'Component/Molecule/LikeToggle',
};

export const Default = () => {
  const handleClick = (toggle: boolean, count: number) => {
    console.log('좋아요 클릭', toggle, count);
  };
  return <LikeToggle interactive onClick={handleClick} />;
};
