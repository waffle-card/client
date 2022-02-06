import React from 'react';
import styled from '@emotion/styled';
import { LikeBox } from '@components';
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
        <CardInfoWrapper type="horizontal">
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
  height: 150px;
  background-color: ${props => props.backgroundColor};
`;

const UpperWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CardInfoWrapper = styled.div``;

const EmojiText = styled.p`
  font-size: 40px;
`;

const UserNameText = styled.p`
  color: ${Common.colors.primary};
`;

const LowerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HashTagText = styled.p`
  color: ${Common.colors.primary};
  font-size: ${Common.fontSize.medium};
`;

export default Header;
