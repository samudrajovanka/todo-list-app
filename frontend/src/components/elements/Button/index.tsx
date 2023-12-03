import React from 'react';

import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

import { ButtonProps } from './types';

const Button = ({
  type = 'button',
  children,
  className,
  isLoading,
  href,
  ...props
}: ButtonProps) => {
  const finalClassName = twMerge('btn btn-primary text-white', className);

  if (href) {
    return (
      <Link href={href}>
        <button type="button" className={finalClassName} {...props}>
          {children}
        </button>
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={finalClassName}
      disabled={props.disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <span className="loading loading-spinner" />
          {props.loadingText}
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
