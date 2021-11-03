import React from 'react';
import styled from '@emotion/styled';
import Common from '@styles';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Text, Button } from '@components';

const Container = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 413px;
  margin-top: 112px;
  @media ${Common.media.sm} {
    margin-top: 64px;
  }
  @media ${Common.media.md} {
    margin-top: 88px;
  }
`;

const LoginGuideWrap = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-top: 56px;
`;

const StyledText = styled(Text)`
  margin-bottom: 56px;
  @media ${Common.media.sm} {
    margin-bottom: 40px;
    font-size: ${Common.fontSize.medium};
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

const EmptyContainer = ({ children = '등록된 카드가 없습니다', notLogin }) => {
  const history = useHistory();

  if (notLogin) {
    return (
      <Container>
        <LoginGuideWrap>
          <StyledText size={24}>와플카드 대화에 참여해보세요!</StyledText>
          <StyledButton
            width={250}
            onClick={() => {
              history.push('/login');
            }}>
            로그인하러 가기
          </StyledButton>
        </LoginGuideWrap>
      </Container>
    );
  }

  return (
    <Container>
      <Text size={20}>{children}</Text>
    </Container>
  );
};

EmptyContainer.protoTypes = {
  children: PropTypes.node.isRequired,
  isLogin: PropTypes.bool,
};

export default EmptyContainer;
