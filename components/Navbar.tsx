'use client';
import Link from 'next/link';
import { ModeToggle } from './ModeToggle';

export function Navbar() {
  return (
    <nav className="flex items-center justify-between p-4 border-b">
      <Link href="/" className="font-bold">FocusTime</Link>
      <div className="flex items-center gap-4">
        <ModeToggle />
      </div>
    </nav>
  );
}
