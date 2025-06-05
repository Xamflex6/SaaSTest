'use client';
import { useEffect, useState, useRef } from 'react';
import { usePomodoroStore } from '../lib/store';
import { Button } from './ui';
import Link from 'next/link';

export default function MainTimer() {
  const {
    timeLeft,
    isRunning,
    start,
    pause,
    reset,
    mode,
    pomodoroCount,
    points,
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

  const getModeDisplay = () => {
    switch (mode) {
      case 'pomodoro':
        return 'Pomodoro';
      case 'shortBreak':
        return 'Pause courte';
      case 'longBreak':
        return 'Pause longue';
      default:
        return 'Pomodoro';
    }
  };

  const getModeColor = () => {
    switch (mode) {
      case 'pomodoro':
        return 'text-red-400';
      case 'shortBreak':
        return 'text-green-400';
      case 'longBreak':
        return 'text-blue-400';
      default:
        return 'text-red-400';
    }
  };

  return (
    <div className="space-y-8 w-full max-w-4xl mx-auto">
      {/* Timer principal en grand */}
      <div className="flex flex-col items-center gap-6">
        <div className="flex flex-col items-center gap-4">
          <span className={`uppercase text-lg tracking-widest font-bold ${getModeColor()}`}>
            {getModeDisplay()}
          </span>
          <div className="text-8xl md:text-9xl font-mono text-center font-bold text-white tracking-wide">
            {display}
          </div>
        </div>        {/* Contrôles */}
        <div className="flex justify-center gap-4">
          {isRunning ? (
            <Button onClick={pause} className="px-8 py-4 text-lg">
              Pause
            </Button>
          ) : (
            <Button onClick={start} className="px-8 py-4 text-lg">
              Start
            </Button>
          )}
          <Button variant="secondary" onClick={reset} className="px-8 py-4 text-lg">
            Reset
          </Button>
        </div>

        {/* Statistiques rapides */}
        <div className="flex flex-col sm:flex-row gap-6 items-center justify-center text-center">
          <div className="flex flex-col items-center gap-1">
            <span className="text-2xl font-bold text-red-400">{pomodoroCount}</span>
            <span className="text-sm text-zinc-400 uppercase tracking-wide">
              Pomodoros aujourd&apos;hui
            </span>
          </div>
          <div className="hidden sm:block w-px h-8 bg-zinc-600"></div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-2xl font-bold text-blue-400">{points}</span>
            <span className="text-sm text-zinc-400 uppercase tracking-wide">
              Points totaux
            </span>
          </div>
        </div>        {/* Lien vers la configuration */}
        <div className="flex justify-center">
          <Link href="/config">
            <Button variant="ghost" className="px-6 py-2">
              Configurer le timer
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
