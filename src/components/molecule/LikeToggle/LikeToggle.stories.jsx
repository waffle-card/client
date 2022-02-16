import { LikeToggle } from '@/components';

export default {
  title: 'Component/Domain/LikeToggle',
};

export const Default = () => {
  const handleClick = (toggle, count) => {
    console.log('좋아요 클릭', toggle, count);
  };
  return <LikeToggle interactive onClick={handleClick} />;
};
