interface TextProps extends React.ComponentProps<'html'> {
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
