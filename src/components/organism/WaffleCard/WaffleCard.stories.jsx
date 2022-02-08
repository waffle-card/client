import { WaffleCard } from '@components';

export default {
  title: 'Component/Domain/WaffleCard',
};

const dummyWaffleCard = {
  id: '1',
  userId: '123',
  userName: '윤호',
  emoji: '😎',
  color: 'rgba(57, 219, 178, 1)',
  hashTags: ['안녕', '클레오파트라', '세상에서', '제일가는', '포테이토칩'],
  likeCount: 3,
  createdAt: '2022-02-05T13:51:11.462Z',
  updatedAt: '2022-02-05T13:51:11.462Z',
};

export const Default = () => {
  return (
    <>
      <WaffleCard type="basic" waffleCardData={dummyWaffleCard} />
      <WaffleCard type="my" waffleCardData={dummyWaffleCard} />
      <WaffleCard type="plain" waffleCardData={dummyWaffleCard} />
    </>
  );
};
