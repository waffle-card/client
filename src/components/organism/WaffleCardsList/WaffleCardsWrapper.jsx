import React from 'react';
import styled from '@emotion/styled';
import Common from '@/styles';
import { keyframes } from '@emotion/react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';

const WaffleCardsWrapper = ({
  children,
  isOverflow,
  containerRef,
  ...props
}) => {
  const CardsLength = React.Children.count(children);

  // useEffect(() => {
  //   if (containerRef) {
  //     setTimeout(() => {
  //       containerRef.scrollLeft = containerRef.scrollWidth / 3;
  //     }, 1000);
  //   }
  // }, [containerRef]);

  return (
    <CardsWrapper isOverflow={isOverflow} CardsLength={CardsLength} {...props}>
      {children}
    </CardsWrapper>
  );
};

const translate = keyframes`
 0% {
  transform:translateX(0%);
  }
  100% {
    transform:translateX(-50%)
  }
`;

const CardsWrapper = styled.ul`
  display: flex;
  align-items: center;
  // 반응형 시에 변하는 너비까지 모두 고려해서 전체 너비를 각각 지정해줌
  width: ${({ CardsLength }) => (265 + 32) * CardsLength}px;
  @media ${Common.media.md} {
    width: ${({ CardsLength }) => (216 + 32) * CardsLength}px;
  }
  @media ${Common.media.sm} {
    width: ${({ CardsLength }) => (180 + 32) * CardsLength}px;
  }
  ${({ isOverflow, CardsLength }) => {
    if (isOverflow) {
      return css`
        justify-content: left;
        animation-name: ${translate};
        animation-duration: ${CardsLength /
        0.8}s; // 카드 갯수에 비례해서 속도를 계산함
        animation-delay: 1s;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
        animation-direction: normal;
        &:hover {
          animation-play-state: paused;
        }
      `;
    } else {
      return css`
        justify-content: center;
      `;
    }
  }};
`;

WaffleCardsWrapper.protoTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  isOverflow: PropTypes.bool,
  containerRef: PropTypes.node,
};

WaffleCardsWrapper.defaultProps = {
  type: 'total',
};

export default WaffleCardsWrapper;
