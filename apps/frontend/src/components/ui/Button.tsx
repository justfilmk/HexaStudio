import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  asChild?: boolean;
}

const buttonStyles = {
  base: 'inline-flex items-center justify-center rounded-none transition-all duration-300 font-medium active:scale-95 disabled:opacity-50',
  variants: {
    primary: 'bg-black text-white hover:bg-neutral-800',
    secondary: 'bg-neutral-200 text-black hover:bg-neutral-300',
    outline: 'border border-black text-black hover:bg-black hover:text-white',
    ghost: 'text-neutral-600 hover:bg-neutral-100 hover:text-black',
  },
  sizes: {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  },
};

function getButtonClassName(
  variant: ButtonProps['variant'],
  size: ButtonProps['size'],
  className?: string,
) {
  return cn(
    buttonStyles.base,
    buttonStyles.variants[variant ?? 'primary'],
    buttonStyles.sizes[size ?? 'md'],
    className,
  );
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading,
      asChild = false,
      children,
      ...props
    },
    ref,
  ) => {
    const classes = getButtonClassName(variant, size, className);

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children as React.ReactElement<{ className?: string }>, {
        className: cn(classes, (children as React.ReactElement<{ className?: string }>).props.className),
      });
    }

    return (
      <button ref={ref} className={classes} disabled={isLoading} {...props}>
        {isLoading ? (
          <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : null}
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';
