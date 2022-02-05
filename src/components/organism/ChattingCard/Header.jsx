import React from 'react';
import styled from '@emotion/styled';
import { LikeBox } from '@components';
import Common from '@styles';

const Header = ({ ...props }) => {
  return (
    <Container>
      <UpperWrapper>
        <CardInfoWrapper type="horizontal">
          <EmojiText>😎</EmojiText>
          <UserNameText>선글라스남</UserNameText>
        </CardInfoWrapper>
        <LikeBox />
      </UpperWrapper>
      <LowerWrapper>
        <HashTagText>안녕</HashTagText>
        <HashTagText>클레오파트라</HashTagText>
        <HashTagText>세상에서</HashTagText>
        <HashTagText>제일가는</HashTagText>
        <HashTagText>포테이토칩</HashTagText>
      </LowerWrapper>
    </Container>
  );
};

const Container = styled.div``;

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
