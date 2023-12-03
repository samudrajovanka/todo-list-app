import { twMerge } from 'tailwind-merge';

import { ContainerProps } from './types';

const Container = ({ as: Component = 'div', children, className }: ContainerProps) => {
  return (
    <Component className={twMerge('container mx-auto', className)}>
      {children}
    </Component>
  );
};

export default Container;
