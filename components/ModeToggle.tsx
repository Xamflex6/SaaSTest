'use client';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const toggle = () => setTheme(theme === 'light' ? 'dark' : 'light');
  return (
    <button onClick={toggle} aria-label="Toggle Theme" className="p-2">
      {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  );
}
