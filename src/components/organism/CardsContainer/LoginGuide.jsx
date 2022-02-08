import React from 'react';
import styled from '@emotion/styled';
import Common from '@styles';
import { Button } from '@components';
import { useNavigate } from 'react-router-dom';
import { Text } from '@components';

const LoginGuide = () => {
  const navigate = useNavigate();

  return (
    <GuideWrap>
      <StyledText size={24}>와플카드 대화에 참여해보세요!</StyledText>
      <StyledButton
        width={250}
        onClick={() => {
          navigate('/login');
        }}>
        로그인하러 가기
      </StyledButton>
    </GuideWrap>
  );
};

const GuideWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  @media ${Common.media.sm} {
    height: calc(180px * 1.56);
  }
  @media ${Common.media.md} {
    height: calc(216px * 1.56);
  }
  @media ${Common.media.lg} {
    height: calc(265px * 1.56);
  }
`;

const StyledButton = styled(Button)`
  font-weight: ${Common.fontWeight.bold};
  @media ${Common.media.sm} {
    width: 180px;
    height: 40px;
    font-size: ${Common.fontSize.small};
  }
`;

const StyledText = styled(Text)`
  margin-bottom: 56px;
  @media ${Common.media.sm} {
    margin-bottom: 40px;
    font-size: ${Common.fontSize.medium};
  }
`;

export default LoginGuide;
