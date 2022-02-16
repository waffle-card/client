import { css } from '@emotion/react';
import Common from '@/styles';

export const tabItemSize = css`
  width: calc(100% / 3);
  height: 47px;
  min-height: 25px;
  @media ${Common.media.sm} {
    height: ${47 * 0.68}px;
  }
  cursor: pointer;
`;
