import '../styles/globals.css';
import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { Navbar } from '../components/Navbar';
import { Providers } from '../components/Providers';

export const metadata: Metadata = {
  title: 'PomodoroTimerByXamflex',
  description: 'Pomodoro SaaS application',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`h-full dark ${GeistSans.className}`}> 
      <body className="min-h-screen h-full bg-zinc-900 text-zinc-100 antialiased transition-colors duration-300"> 
        <Providers>
          <Navbar />
          <main className="flex-1 p-4 md:p-8 max-w-4xl mx-auto w-full min-h-[calc(100vh-64px)]">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
