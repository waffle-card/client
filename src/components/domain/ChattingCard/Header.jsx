import styled from '@emotion/styled';
import Icons from '@components/base/Icons';
import Text from '@components/base/Text';
import Favorite from './Favorite';
import Like from './Like';
import Common from '@styles';

const Top = styled.div`
  display: flex;
  height: 50%;
  justify-content: space-between;
  box-sizing: border-box;

  @media ${Common.media.sm} {
    max-height: 40px;
  }

  @media ${Common.media.md} {
    min-height: 80px;
    max-height: 90px;
  }

  @media ${Common.media.lg} {
    min-height: 90px;
    max-height: 120px;
  }
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyleText = styled(Text)`
  white-space: nowrap;
  @media ${Common.media.sm} {
    font-size: 10px;
  }
`;

const EmojiBox = styled(Text)`
  @media ${Common.media.sm} {
    font-size: 20px;
    margin-bottom: 5px;
  }

  @media ${Common.media.md} {
    font-size: 40px;
    margin-bottom: 8px;
  }

  @media ${Common.media.lg} {
    font-size: 50px;
    margin-bottom: 10px;
  }
`;

const Header = ({ backgroundColor, ...props }) => {
  const title = '내이름은 제페토';
  const Emoji = '🥱';

  return (
    <Top>
      <Icons style={{ width: '120px' }}>
        <Icons.ArrowBack></Icons.ArrowBack>
      </Icons>
      <Title style={{ width: '120px' }}>
        <EmojiBox>{Emoji}</EmojiBox>
        <StyleText block>{title}</StyleText>
      </Title>
      <Icons style={{ width: '120px', justifyContent: 'end' }}>
        <Like />
        <Favorite />
      </Icons>
    </Top>
  );
};

export default Header;
