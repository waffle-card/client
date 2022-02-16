import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Text } from '@/components';
import Common from '@/styles';

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
  const handleClick = e => {
    onClick && onClick(e);
  };

  return (
    <Container onClick={handleClick} {...props}>
      <IconText size={'75px'} color={Common.colors.secondary}>
        +
      </IconText>
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
