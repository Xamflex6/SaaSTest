'use client';
import { useEffect, useState, useRef } from 'react';
import { usePomodoroStore } from '../lib/store';
import { Button, Input } from './ui';

export default function Timer() {
  const {
    timeLeft,
    isRunning,
    start,
    pause,
    reset,
    mode,
    pomodoroDuration,
    shortBreakDuration,
    longBreakDuration,
    pomodorosBeforeLongBreak,
    setPomodoroDuration,
    setShortBreakDuration,
    setLongBreakDuration,
    setPomodorosBeforeLongBreak,
    pomodoroCount,
    points,
    badges,
  } = usePomodoroStore();
  const [display, setDisplay] = useState('25:00');
  const prevTimeLeft = useRef(timeLeft);
  const prevMode = useRef(mode);

  // Son court (bip) en base64 (wav)
  const beep = () => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = 'sine';
      o.frequency.value = 880;
      g.gain.value = 0.1;
      o.connect(g);
      g.connect(ctx.destination);
      o.start();
      o.stop(ctx.currentTime + 0.2);
      o.onended = () => ctx.close();
    } catch (e) {
      // Ignore les erreurs (souvent liées à l'autoplay policy)
    }
  };

  useEffect(() => {
    // Affichage du temps
    const mins = Math.floor(timeLeft / 60)
      .toString()
      .padStart(2, '0');
    const secs = (timeLeft % 60).toString().padStart(2, '0');
    setDisplay(`${mins}:${secs}`);
  }, [timeLeft]);

  useEffect(() => {
    // Notification + son à la fin d'une session (quand le mode change et le timer repart)
    if (
      prevMode.current !== mode &&
      prevTimeLeft.current === 0
    ) {
      if (typeof window !== 'undefined' && 'Notification' in window) {
        if (Notification.permission === 'granted') {
          new Notification('Temps écoulé !', { body: 'Fais une pause ☕' });
        } else if (Notification.permission !== 'denied') {
          Notification.requestPermission().then((permission) => {
            if (permission === 'granted') {
              new Notification('Temps écoulé !', { body: 'Fais une pause ☕' });
            }
          });
        }
      }
      setTimeout(() => {
        beep();
      }, 0);
    }
    prevMode.current = mode;
  }, [mode]);

  useEffect(() => {
    prevTimeLeft.current = timeLeft;
  }, [timeLeft]);

  return (
    <div className="space-y-6 w-full max-w-xl mx-auto">
      <div className="flex flex-col items-center gap-2">
        <span className="uppercase text-xs tracking-widest text-blue-400 font-semibold">
          {mode === 'pomodoro' && 'Pomodoro'}
          {mode === 'shortBreak' && 'Pause courte'}
          {mode === 'longBreak' && 'Pause longue'}
        </span>
        <div className="text-6xl font-mono text-center break-words w-full">{display}</div>
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
      <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4 sm:p-6 flex flex-col gap-3 max-w-md mx-auto w-full">
        <h3 className="text-sm font-bold text-zinc-200 mb-1">Paramètres</h3>
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2 text-zinc-300">
            Durée Pomodoro (min)
            <Input
              type="number"
              min={1}
              max={60}
              value={Math.round(pomodoroDuration / 60)}
              onChange={e => setPomodoroDuration(Number(e.target.value) * 60)}
              className="w-16 text-center"
            />
          </label>
          <label className="flex items-center gap-2 text-zinc-300">
            Pause courte (min)
            <Input
              type="number"
              min={1}
              max={30}
              value={Math.round(shortBreakDuration / 60)}
              onChange={e => setShortBreakDuration(Number(e.target.value) * 60)}
              className="w-16 text-center"
            />
          </label>
          <label className="flex items-center gap-2 text-zinc-300">
            Pause longue (min)
            <Input
              type="number"
              min={1}
              max={60}
              value={Math.round(longBreakDuration / 60)}
              onChange={e => setLongBreakDuration(Number(e.target.value) * 60)}
              className="w-16 text-center"
            />
          </label>
          <label className="flex items-center gap-2 text-zinc-300">
            Pomodoros avant pause longue
            <Input
              type="number"
              min={1}
              max={10}
              value={pomodorosBeforeLongBreak}
              onChange={e => setPomodorosBeforeLongBreak(Number(e.target.value))}
              className="w-16 text-center"
            />
          </label>
        </div>
      </div>
    </div>
  );
}
