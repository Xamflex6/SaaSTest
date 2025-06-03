import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { Providers } from '../components/Providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FocusTime',
  description: 'Pomodoro SaaS application',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className + ' min-h-screen bg-background antialiased'}>
        <Providers>
          <Navbar />
          <div className="flex">
            <Sidebar />
            <main className="flex-1 p-4">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
