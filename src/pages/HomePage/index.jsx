import styled from '@emotion/styled';
import Common from '@styles';
import { Route, Link } from 'react-router-dom';

import {
  Icons,
  Tab,
  WaffleCard,
  CardEditModal,
  ChattingCard,
} from '@components';

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  padding: 10px 50px;
  @media ${Common.media.sm} {
    padding: 10px 16px;
  }
  height: calc(100vh - 60px);
  margin: 0 auto;
`;

const CardContainer = styled.section`
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  margin-top: 112px;
  overflow-x: scroll;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
  @media ${Common.media.sm} {
    margin-top: 64px;
  }
  @media ${Common.media.md} {
    margin-top: 88px;
  }
`;

const StyledCard = styled(WaffleCard)`
  flex: 0 0 auto;
  margin: 0 10px;
`;

const HomePage = () => {
  return (
    <HomeContainer>
      <nav>
        <Tab>
          <Tab.Item title="오늘의 카드" index="0" param="today"></Tab.Item>
          <Tab.Item title="나의 카드" index="1" param="my"></Tab.Item>
          <Tab.Item title="즐겨찾기" index="2" param="bookmark"></Tab.Item>
        </Tab>
      </nav>
      <CardContainer>
        <Icons backgroundColor={'rgba(0, 0, 0, 0)'}>
          <Icons.ArrowBack color={Common.colors.primary} fontSize={'30px'} />
        </Icons>
        <Link to={`/card/chat:1`}>
          <StyledCard />
        </Link>
        <Link to={`/card/chat:2`}>
          <StyledCard />
        </Link>
        <Link to={`/card/chat:3`}>
          <StyledCard />
        </Link>
        <Link to={`/card/chat:4`}>
          <StyledCard />
        </Link>
        <Link to={`/card/chat:5`}>
          <StyledCard />
        </Link>
        <Link to={`/card/chat:6`}>
          <StyledCard />
        </Link>
        <Link to={`/card/chat:7`}>
          <StyledCard />
        </Link>
        <Link to={`/card/chat:8`}>
          <StyledCard />
        </Link>
        <Link to={`/card/chat:9`}>
          <StyledCard />
        </Link>
        <Link to={`/card/chat:10`}>
          <StyledCard />
        </Link>
        <Link to={`/card/chat:11`}>
          <StyledCard />
        </Link>
        <Link to={`/card/chat:12`}>
          <StyledCard />
        </Link>
        <Icons backgroundColor={'rgba(0, 0, 0, 0)'}>
          <Icons.ArrowFront color={Common.colors.primary} fontSize={'30px'} />
        </Icons>
      </CardContainer>
      <Route path="/card/create" render={() => <CardEditModal visible />} />
      <Route
        path="/card/update:cardId"
        render={() => <CardEditModal visible />}
      />
      <Route path="/card/chat:cardId" render={() => <ChattingCard visible />} />
    </HomeContainer>
  );
};
export default HomePage;
