import * as React from 'react';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', ...props }, ref) => {
    const base =
      'flex h-9 w-full rounded-md border px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500';
    const classes = [base, className].join(' ');
    return <input ref={ref} className={classes} {...props} />;
  },
);
Input.displayName = 'Input';
