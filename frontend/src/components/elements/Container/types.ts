type ContainerElement = 'div' | 'section';

export type ContainerProps = React.PropsWithChildren & {
  className?: string;
  as?: ContainerElement;
};
