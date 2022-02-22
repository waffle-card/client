import type { HTMLAttributes } from 'react';

interface TextProps extends HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  block?: boolean;
  paragraph?: boolean;
  size?: string | number;
  weight?: string | number;
  color?: string;
  underline?: boolean;
  del?: boolean;
}

export type { TextProps };
