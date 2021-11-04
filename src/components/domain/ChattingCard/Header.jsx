import styled from '@emotion/styled';
import Icons from '@components/base/Icons';
import Text from '@components/base/Text';
import Bookmark from './Bookmark';
import Like from './Like';
import Common from '@styles';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';

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

const StyledText = styled(Text)`
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

const Header = ({ backgroundColor, title, authorName, ...props }) => {
  const history = useHistory();

  return (
    <Top>
      <div style={{ width: '120px' }}>
        <Icons fontSize="20px">
          <Icons.ArrowBack onClick={() => history.push('/')}></Icons.ArrowBack>
        </Icons>
      </div>

      <Title style={{ width: '120px' }}>
        <EmojiBox>{title}</EmojiBox>
        <StyledText block>{authorName}</StyledText>
      </Title>
      <Icons fontSize="20px" style={{ width: '120px', justifyContent: 'end' }}>
        <Like fontSize="20px" />
        <Bookmark />
      </Icons>
    </Top>
  );
};

Header.propTypes = {
  backgroundColor: PropTypes.string,
  title: PropTypes.string,
  authorName: PropTypes.string,
};

export default Header;
