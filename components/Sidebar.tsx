'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/dashboard', label: 'Dashboard' },
];

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-48 border-r p-4 hidden md:block">
      <ul className="space-y-2">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              className={
                pathname === l.href ? 'font-bold text-primary' : 'text-muted-foreground'
              }
              href={l.href}
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
