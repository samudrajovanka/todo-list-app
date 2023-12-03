import { twMerge } from 'tailwind-merge';

import CardBody from './Body';
import { CardProps } from './types';

const Card = ({ children, className }: CardProps) => {
  return (
    <div className={twMerge('card max-w-md w-full bg-base-100 shadow-lg', className)}>
      {children}
    </div>
  );
};

Card.Body = CardBody;

export default Card;
