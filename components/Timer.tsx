'use client';
import { useEffect, useState } from 'react';
import { usePomodoroStore } from '../lib/store';
import { Button } from '@shadcn/ui';

export default function Timer() {
  const { timeLeft, isRunning, start, pause, reset } = usePomodoroStore();
  const [display, setDisplay] = useState('25:00');

  useEffect(() => {
    const mins = Math.floor(timeLeft / 60)
      .toString()
      .padStart(2, '0');
    const secs = (timeLeft % 60).toString().padStart(2, '0');
    setDisplay(`${mins}:${secs}`);
  }, [timeLeft]);

  return (
    <div className="space-y-4">
      <div className="text-6xl font-mono text-center">{display}</div>
      <div className="flex justify-center gap-2">
        {isRunning ? (
          <Button onClick={pause}>Pause</Button>
        ) : (
          <Button onClick={start}>Start</Button>
        )}
        <Button variant="secondary" onClick={reset}>
          Reset
        </Button>
      </div>
    </div>
  );
}
