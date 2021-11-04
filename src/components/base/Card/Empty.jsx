import styled from '@emotion/styled';
import React, { useCallback } from 'react';
import { Text, Icons } from '@components';
import PropTypes from 'prop-types';
import Common from '@styles';
import { useHistory } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 265px;
  min-width: 180px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  border: 5px dashed ${Common.colors.secondary};
  border-radius: 16px;
  box-sizing: border-box;
  cursor: pointer;
  transition: all 200ms ease-out;
  &:hover {
    border: 5px dashed ${Common.colors.point};
    p {
      transition: all 200ms ease-out;
      color: ${Common.colors.point};
    }
  }
  @media ${Common.media.sm} {
    width: 180px;
    height: calc(180px * 1.56);
  }
  @media ${Common.media.md} {
    width: 216px;
    height: calc(216px * 1.56);
  }
  @media ${Common.media.lg} {
    width: 265px;
    height: calc(265px * 1.56);
  }
`;

const IconText = styled(Text)`
  margin-bottom: 6px;
`;

const Empty = ({ fontSize, iconSize, onClick, ...props }) => {
  const history = useHistory();
  const handleClick = useCallback(
    e => {
      onClick && onClick(e);
      history.push('/cards/my/create');
    },
    [onClick, history],
  );

  return (
    <Container onClick={handleClick} {...props}>
      <Icons fontSize={iconSize}>
        <Icons.Add color={Common.colors.secondary} />
      </Icons>
      <Text size={fontSize} color={Common.colors.secondary}>
        카드 만들기
      </Text>
    </Container>
  );
};

Empty.propTypes = {
  fontSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  iconSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onClick: PropTypes.func,
};

Empty.defaultProps = {
  iconSize: '4rem',
};

export default Empty;
