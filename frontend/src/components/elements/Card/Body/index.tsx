import { twMerge } from 'tailwind-merge';

import { CardBodyProps } from './types';

const CardBody = ({ children, className }: CardBodyProps) => {
  return (
    <div className={twMerge('card-body items-center text-center', className)}>
      {children}
    </div>
  );
};

export default CardBody;
