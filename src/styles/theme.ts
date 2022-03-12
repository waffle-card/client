import { colors, font, media } from '@/styles';

// TODO(윤호): MUI ThemeProvider와 함꼐 사용하는 방법 찾아보고 수정하기
const theme = {
  colors,
  font,
  media,
} as const;

export default theme;
export type ThemeType = typeof theme;
