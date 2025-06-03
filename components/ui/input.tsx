import * as React from 'react';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', ...props }, ref) => {
    const base =
      'flex h-9 w-full rounded-md border border-zinc-700 bg-zinc-800 text-zinc-100 placeholder-zinc-400 px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 hover:border-blue-400';
    const classes = [base, className].join(' ');
    return <input ref={ref} className={classes} {...props} />;
  },
);
Input.displayName = 'Input';
