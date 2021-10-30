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

  @media ${Common.media.sm} {
    font-size: ${Common.fontSize.small};
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
    font-size: ${Common.fontSize.small};
  }
`;

const Image = styled.img`
  min-width: 30px;
  min-height: 30px;
  max-width: 50px;
  max-height: 50px;
  src: ${({ src }) => src};
`;

const Header = ({ height, backgroundColor, ...props }) => {
  const title = '내이름은 제페토';

  return (
    <Top>
      <Icons style={{ width: '120px' }}>
        <Icons.ArrowBack></Icons.ArrowBack>
      </Icons>
      <Title style={{ width: '120px' }}>
        <Image src={'https://picsum.photos/200'} />
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
