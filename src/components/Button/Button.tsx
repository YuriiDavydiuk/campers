import type { ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';

import css from './Button.module.css';

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant?: 'primary' | 'secondary';
  fullWidth?: boolean;
}

export default function Button({
  children,
  variant = 'primary',
  fullWidth = false,
  type = 'button',
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={clsx(css.button, css[variant], { [css.fullWidth]: fullWidth }, className)}
      {...props}
    >
      {children}
    </button>
  );
}
