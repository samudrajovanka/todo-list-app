import { LinkProps } from 'next/link';

export type ButtonProps = React.PropsWithChildren<
  {
    className?: string;
    isLoading?: boolean;
    loadingText?: string;
  }
  & Pick<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'disabled'>
  & Partial<Pick<LinkProps, 'href'>>
>;
