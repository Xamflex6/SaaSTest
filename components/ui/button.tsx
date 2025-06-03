import * as React from 'react';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'secondary' | 'ghost';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'default', ...props }, ref) => {
    const base =
      'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
    const variants: Record<string, string> = {
      default: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
      secondary:
        'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-400',
      ghost:
        'bg-transparent hover:bg-gray-100 text-gray-900 focus:ring-gray-400',
    };
    const classes = [base, variants[variant], className].join(' ');
    return <button ref={ref} className={classes} {...props} />;
  },
);
Button.displayName = 'Button';
