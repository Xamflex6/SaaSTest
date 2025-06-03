'use client';
import Timer from '../components/Timer';
import TaskList from '../components/TaskList';
import { ExportPomodoroStatsButton } from '../components/ExportPomodoroStatsButton';
import { useEffect } from 'react';
import { usePomodoroStore } from '../lib/store';

export default function Home() {
  const { points, badges } = usePomodoroStore();
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const key = 'pomodoroHistory';
      if (!localStorage.getItem(key)) {
        const fakeData = [
          { date: '2024-06-01', duration: 25, type: 'work' },
          { date: '2024-06-01', duration: 5, type: 'break' },
          { date: '2024-06-01', duration: 25, type: 'work' },
          { date: '2024-06-02', duration: 25, type: 'work' },
        ];
        localStorage.setItem(key, JSON.stringify(fakeData));
      }
    }
  }, []);

  return (
    <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-start justify-center min-h-[80vh] p-4 md:p-12">
      <div className="flex-1 max-w-xl w-full flex flex-col items-center gap-6">
        <div className="w-full bg-zinc-800 rounded-2xl shadow-xl border border-zinc-700 p-8 flex flex-col items-center">
          <Timer />
        </div>
        <div className="w-full bg-zinc-800 rounded-2xl shadow-xl border border-zinc-700 p-6 flex flex-col items-center mt-4">
          <ExportPomodoroStatsButton />
        </div>
      </div>
      <div className="flex-1 max-w-md w-full flex flex-col items-center gap-6">
        <div className="w-full bg-zinc-800 rounded-2xl shadow-xl border border-zinc-700 p-8 flex flex-col items-center">
          <TaskList />
        </div>
        <div className="w-full bg-zinc-800 rounded-2xl shadow-xl border border-zinc-700 p-6 flex flex-col items-center gap-2 mt-4">
          <h3 className="text-blue-400 font-bold text-lg mb-2 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 17.75l-6.172 3.245 1.179-6.873-5-4.873 6.9-1.002L12 2.25l3.093 6.997 6.9 1.002-5 4.873 1.179 6.873z" /></svg>
            Points & Badges
          </h3>
          <div className="text-blue-400 font-bold text-xl">{points} point{points > 1 ? 's' : ''}</div>
          <div className="flex flex-wrap gap-2 justify-center mt-2 w-full">
            {badges.filter(b => b.unlocked).length === 0 && (
              <span className="text-zinc-400 text-xs italic">Aucun badge débloqué</span>
            )}
            {badges.filter(b => b.unlocked).map(b => (
              <span key={b.id} className="bg-blue-900/60 text-blue-300 px-3 py-1 rounded-full text-xs font-semibold border border-blue-700 shadow-sm animate-pulse">
                {b.label}
              </span>
            ))}
          </div>
          <div className="text-zinc-400 text-xs mt-2 text-center">
            Gagnez 1 point à chaque Pomodoro terminé.<br />
            Badges : réalisez 3, 5 ou 10 pomodoros dans la même journée pour les débloquer !
          </div>
        </div>
      </div>
    </div>
  );
}
