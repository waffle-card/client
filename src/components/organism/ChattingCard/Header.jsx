import styled from '@emotion/styled';
import { Icons, Text, LikeBox } from '@components';
import Common from '@styles';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const Top = styled.div`
  display: flex;
  margin-bottom: 14px;
  justify-content: space-between;
  box-sizing: border-box;
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

const StyledDiv = styled.div`
  display: flex;
  width: 120px;
  justify-content: end;
`;

const Header = ({ backgroundColor, title, authorName, cardInfo, ...props }) => {
  const navigate = useNavigate();

  return (
    <Top>
      <div style={{ width: '120px' }}>
        <Icons fontSize="20px">
          <Icons.ArrowBack onClick={() => navigate(-1)}></Icons.ArrowBack>
        </Icons>
      </div>

      <Title style={{ width: '120px' }}>
        <EmojiBox>{title}</EmojiBox>
        <StyledText block>{authorName}</StyledText>
      </Title>
      <StyledDiv>
        <LikeBox cardInfo={cardInfo} style={{ height: '20px' }} />
      </StyledDiv>
    </Top>
  );
};

Header.propTypes = {
  backgroundColor: PropTypes.string,
  title: PropTypes.string,
  authorName: PropTypes.string,
};

export default Header;
