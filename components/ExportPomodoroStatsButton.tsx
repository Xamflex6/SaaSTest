import React from 'react';

export interface PomodoroHistoryItem {
  date: string; // format YYYY-MM-DD
  duration: number; // en minutes
  type: 'work' | 'break';
}

export const ExportPomodoroStatsButton: React.FC = () => {
  const handleExport = () => {
    if (typeof window === 'undefined') return;
    const data = localStorage.getItem('pomodoroHistory');
    const arr: PomodoroHistoryItem[] = data ? JSON.parse(data) : [];
    const json = JSON.stringify(arr, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'pomodoro-stats.json';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 0);
  };

  return (
    <button
      type="button"
      onClick={handleExport}
      className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
    >
      Exporter les stats Pomodoro
    </button>
  );
}; 