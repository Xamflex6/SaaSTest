import * as React from 'react';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'secondary' | 'ghost';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'default', ...props }, ref) => {
    const base =
      'inline-flex items-center justify-center rounded-lg px-5 py-2 text-base font-semibold shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed';
    const variants: Record<string, string> = {
      default:
        'bg-gradient-to-br from-blue-600 to-blue-500 text-white hover:from-blue-700 hover:to-blue-600 active:scale-95 focus:ring-blue-400',
      secondary:
        'bg-zinc-700 text-zinc-100 hover:bg-zinc-600 active:scale-95 focus:ring-zinc-400',
      ghost:
        'bg-transparent text-zinc-300 hover:bg-zinc-800/60 hover:text-blue-400 active:scale-95 focus:ring-blue-400',
    };
    const classes = [base, variants[variant], className].join(' ');
    return <button ref={ref} className={classes} {...props} />;
  },
);
Button.displayName = 'Button';
