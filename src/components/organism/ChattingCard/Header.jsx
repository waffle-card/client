import React from 'react';
import styled from '@emotion/styled';
import { LikeBox } from '@components';
import { IconButton } from '@mui/material';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import Common from '@styles';

const dummy = {
  id: '123',
  userId: 'String',
  userName: '윤호',
  emoji: '😎',
  color: 'rgba(57, 219, 178, 1)',
  hashTags: ['안녕', '클레오파트라', '세상에서', '제일가는', '포테이토칩'],
  likeCount: 3,
  createdAt: 'String',
  updatedAt: 'String',
};

const Header = ({ waffleCardData = dummy, ...props }) => {
  return (
    <Container backgroundColor={waffleCardData.color} {...props}>
      <UpperWrapper>
        <IconButton>
          <BackIcon />
        </IconButton>
        <CardInfoWrapper>
          <EmojiText>{waffleCardData.emoji}</EmojiText>
          <UserNameText>{waffleCardData.userName}</UserNameText>
        </CardInfoWrapper>
        <LikeBox />
      </UpperWrapper>
      <LowerWrapper>
        {waffleCardData.hashTags.map((hashTag, idx) => (
          <HashTagText key={idx}>{`#${hashTag}`}</HashTagText>
        ))}
      </LowerWrapper>
    </Container>
  );
};

const Container = styled.div`
  border-radius: 1rem 1rem 0 0;
  background-color: ${props => props.backgroundColor};
`;

const UpperWrapper = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0 1rem;
`;

const BackIcon = styled(ArrowBackIosNewRoundedIcon)`
  color: white;
`;

const CardInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const EmojiText = styled.p`
  @media ${Common.media.sm} {
    font-size: 32px;
  }
  @media ${Common.media.md} {
    font-size: 40px;
  }
  @media ${Common.media.lg} {
    font-size: 40px;
  }
`;

const UserNameText = styled.p`
  color: ${Common.colors.primary};
  font-weight: ${Common.fontWeight.medium};

  margin: 0.5rem 0;

  @media ${Common.media.sm} {
    font-size: ${Common.fontSize.small};
  }
  @media ${Common.media.md} {
    font-size: ${Common.fontSize.base};
  }
  @media ${Common.media.lg} {
    font-size: ${Common.fontSize.medium};
  }
`;

const LowerWrapper = styled.div`
  display: flex;
  height: 100px;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const HashTagText = styled.p`
  color: ${Common.colors.primary};
  font-weight: ${Common.fontWeight.bold};
  margin: 0 1rem;

  @media ${Common.media.sm} {
    font-size: ${Common.fontSize.small};
  }
  @media ${Common.media.md} {
    font-size: ${Common.fontSize.base};
  }
  @media ${Common.media.lg} {
    font-size: ${Common.fontSize.medium};
  }
`;

export default Header;
