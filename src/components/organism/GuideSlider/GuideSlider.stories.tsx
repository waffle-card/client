import { GuideSlider } from '@/components';
import styled from '@emotion/styled';

export default {
  title: 'Component/Organism/GuideSlider',
  component: GuideSlider,
};

const Container = styled.div`
  height: 100vh;
  background-color: #0d0f13;
`;

export const Default = () => {
  return (
    <Container>
      <GuideSlider />
    </Container>
  );
};
