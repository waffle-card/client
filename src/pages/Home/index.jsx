import Icons from '@components/base/Icons';
import Tab from '@components/domain/Tab';
import styled from '@emotion/styled';
import Common from '@styles';
import WaffleCard from '@components/domain/WaffleCard';
// import Text from '@components/base/Text';

const HomeContainer = styled.div`
  max-width: 1690px;
  height: 100vh;
  margin: 0 auto;
`;

// ----------------------header------------------------- //
const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 55px;
`;

const Logo = styled.h1`
  margin: 0;
  font-size: 0;
  a {
    display: block;
    img {
      width: auto;
      height: 24px;
      @media ${Common.media.sm} {
        height: 18px;
      }
    }
  }
`;

// ----------------------nav------------------------- //
const Nav = styled.nav`
  margin-top: 140px;
  @media ${Common.media.sm} {
    margin-top: 30px;
  }
`;

// ----------------------section------------------------- //
const CardContainer = styled.section`
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  margin-top: 93px;
  overflow-x: scroll;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
  @media ${Common.media.sm} {
    margin-top: 60px;
  }
`;

const StyledCard = styled(WaffleCard)`
  flex: 0 0 auto;
  @media ${Common.media.md} {
    width: 218.33px;
    height: 329.55px;
  }
  @media ${Common.media.sm} {
    width: 185px;
    height: 271.7px;
  }
`;

const Home = () => {
  return (
    <HomeContainer>
      <Header>
        <Logo>
          <a>
            <img src={require('./images/logo.png').default} alt="logo" />
          </a>
        </Logo>
        <Icons.Person color={Common.colors.point} />
        {/* 로그인 유무에 따라 보여주기 */}
        {/* <Text color={Common.colors.point} size={Common.fontSize.medium}>
          로그인
        </Text> */}
      </Header>
      <Nav>
        <Tab>
          <Tab.Item title="오늘의 카드" index="0"></Tab.Item>
          <Tab.Item title="나의 카드" index="1"></Tab.Item>
          <Tab.Item title="즐겨찾기" index="2"></Tab.Item>
        </Tab>
      </Nav>
      <CardContainer>
        <Icons backgroundColor={'rgba(0, 0, 0, 0)'}>
          <Icons.ArrowBack color={Common.colors.primary} fontSize={'30px'} />
        </Icons>
        <StyledCard />
        <StyledCard />
        <StyledCard />
        <StyledCard />
        <StyledCard />
        <StyledCard />
        <StyledCard />
        <StyledCard />
        <StyledCard />
        <StyledCard />
        <StyledCard />
        <StyledCard />
        <Icons backgroundColor={'rgba(0, 0, 0, 0)'}>
          <Icons.ArrowFront color={Common.colors.primary} fontSize={'30px'} />
        </Icons>
      </CardContainer>
    </HomeContainer>
  );
};
export default Home;
