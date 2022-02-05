import { LikeBox } from '@components';

export default {
  title: 'Component/Domain/LikeBox',
};

export const Default = () => {
  const handleClick = (toggle, count) => {
    console.log('좋아요 클릭', toggle, count);
  };
  return <LikeBox interactive onClick={handleClick} />;
};
