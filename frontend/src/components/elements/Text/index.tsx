import { twMerge } from 'tailwind-merge';

import { TextProps, Typography } from './types';

const typographyValue: Record<Typography, string> = {
  h1: 'text-2xl sm:text-4xl font-bold',
  h2: 'text-xl sm:text-2xl font-bold',
  h3: 'text-base sm:text-xl font-bold',
  h4: 'text sm:text-base font-bold',
  md: 'text-base sm:text-xl',
  sm: 'text-sm sm:text-base',
  xs: 'text-xs sm:text-sm'
};

const Text = ({ as: Component = 'p', children, typography = 'sm', className }: TextProps) => {
  const typographyClassName = typographyValue[typography];

  return (
    <Component
      className={twMerge(typographyClassName, 'text-neutral', className)}
    >
      {children}
    </Component>
  );
};

export default Text;
