'use client';
import Link from 'next/link';

export function Navbar() {
  return (
    <nav className="flex items-center justify-between p-4 border-b border-zinc-700">
      <Link href="/" className="font-bold text-xl tracking-tight">PomodoroTimerByXamflex</Link>
    </nav>
  );
}
