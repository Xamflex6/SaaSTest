'use client';
import { usePomodoroStore } from '../lib/store';

export function SessionHistory() {
  const { history } = usePomodoroStore();
  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Session History</h2>
      <ul className="space-y-1">
        {history.map((h, i) => (
          <li key={i} className="p-2 border rounded">
            {new Date(h).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
