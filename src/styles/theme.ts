import { colors, font, media } from '@/styles';

const theme = {
  colors,
  font,
  media,
} as const;

export default theme;
export type ThemeType = typeof theme;
