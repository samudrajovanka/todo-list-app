type TextElement =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'p';

export type Typography = 
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'md'
  | 'sm'
  | 'xs';

export type TextProps = React.PropsWithChildren<{
  as?: TextElement;
  className?: string;
  typography?: Typography
}>;
