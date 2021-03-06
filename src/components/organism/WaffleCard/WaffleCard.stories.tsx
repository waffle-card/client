import { WaffleCard } from '@/components';
import { WaffleCardType } from '@/types';

export default {
  title: 'Component/Organism/WaffleCard',
};

const dummyWaffleCard: WaffleCardType = {
  id: '1',
  user: {
    id: '1',
    email: 'test@test.com',
    name: 'νμ€ν°',
  },
  emoji: 'π',
  color: 'rgba(57, 219, 178, 1)',
  hashTags: ['μλ', 'ν΄λ μ€ννΈλΌ', 'μΈμμμ', 'μ μΌκ°λ', 'ν¬νμ΄ν μΉ©'],
  likeUserIds: [],
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
