import styled from '@emotion/styled';
import Common from '@styles';
import { Route, Link } from 'react-router-dom';

import { Icons } from '@components';
import { Tab } from '@components';
import { WaffleCard } from '@components';
import { CardEditModal } from '@components';
import { ChattingCard } from '@components';

const HomeContainer = styled.div`
  max-width: 1690px;
  padding: 10px 50px;
  height: calc(100vh - 60px);
  margin: 0 auto;
`;

const Nav = styled.nav`
  margin-top: 152px;
  @media ${Common.media.sm} {
    margin-top: 80px;
  }
  @media ${Common.media.md} {
    margin-top: 72px;
  }
`;

const CardContainer = styled.section`
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  margin-top: 120px;
  overflow-x: scroll;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
  @media ${Common.media.sm} {
    margin-top: 80px;
  }
  @media ${Common.media.md} {
    margin-top: 72px;
  }
`;

const StyledCard = styled(WaffleCard)`
  flex: 0 0 auto;
  margin: 0 10px;
`;

const Home = () => {
  return (
    <HomeContainer>
      <Nav>
        <Tab>
          <Tab.Item title="오늘의 카드" index="0" param="today"></Tab.Item>
          <Tab.Item title="나의 카드" index="1" param="my"></Tab.Item>
          <Tab.Item title="즐겨찾기" index="2" param="favorite"></Tab.Item>
        </Tab>
      </Nav>
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
      <Route path="/card/chat:cardId" component={ChattingCard} />
    </HomeContainer>
  );
};
export default Home;
