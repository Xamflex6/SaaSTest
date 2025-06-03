import { create } from 'zustand';

export interface Task {
  id: string;
  label: string;
  done: boolean;
}

export interface Badge {
  id: string;
  label: string;
  unlocked: boolean;
}

interface PomodoroState {
  timeLeft: number;
  isRunning: boolean;
  tasks: Task[];
  history: number[];
  stats: { day: string; sessions: number }[];
  pomodoroDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
  pomodorosBeforeLongBreak: number;
  pomodoroCount: number;
  mode: 'pomodoro' | 'shortBreak' | 'longBreak';
  points: number;
  badges: Badge[];
  start: () => void;
  pause: () => void;
  reset: () => void;
  tick: () => void;
  setPomodoroDuration: (n: number) => void;
  setShortBreakDuration: (n: number) => void;
  setLongBreakDuration: (n: number) => void;
  setPomodorosBeforeLongBreak: (n: number) => void;
  addTask: (t: string) => void;
  removeTask: (id: string) => void;
  toggleTask: (id: string) => void;
}

const BADGES: Badge[] = [
  { id: '3-in-a-day', label: '3 pomodoros en un jour', unlocked: false },
  { id: '5-in-a-day', label: '5 pomodoros en un jour', unlocked: false },
  { id: '10-in-a-day', label: '10 pomodoros en un jour', unlocked: false },
];

export const usePomodoroStore = create<PomodoroState>((set, get) => {
  let timer: NodeJS.Timeout;
  return {
    pomodoroDuration: 1500, // 25 min
    shortBreakDuration: 300, // 5 min
    longBreakDuration: 900, // 15 min
    pomodorosBeforeLongBreak: 4,
    pomodoroCount: 0,
    mode: 'pomodoro',
    timeLeft: 1500,
    isRunning: false,
    tasks: [],
    history: [],
    stats: [],
    points: 0,
    badges: BADGES,
    start: () => {
      if (get().isRunning) return;
      set({ isRunning: true });
      timer = setInterval(() => get().tick(), 1000);
    },
    pause: () => {
      clearInterval(timer);
      set({ isRunning: false });
    },
    reset: () => {
      clearInterval(timer);
      set({
        isRunning: false,
        timeLeft:
          get().mode === 'pomodoro'
            ? get().pomodoroDuration
            : get().mode === 'shortBreak'
            ? get().shortBreakDuration
            : get().longBreakDuration,
      });
    },
    tick: () => {
      set((state) => {
        if (state.timeLeft <= 1) {
          clearInterval(timer);
          if (state.mode === 'pomodoro') {
            const newCount = state.pomodoroCount + 1;
            // Points : 1 point par pomodoro terminé
            const newPoints = state.points + 1;
            // Badges : check du jour
            const today = new Date().toLocaleDateString();
            const todayStats = updateStats(state.stats, Date.now());
            const todaySessions = todayStats.find(s => s.day === today)?.sessions || 0;
            let newBadges = state.badges.map(b => {
              if (b.id === '3-in-a-day' && todaySessions >= 3) return { ...b, unlocked: true };
              if (b.id === '5-in-a-day' && todaySessions >= 5) return { ...b, unlocked: true };
              if (b.id === '10-in-a-day' && todaySessions >= 10) return { ...b, unlocked: true };
              return b;
            });
            if (newCount % state.pomodorosBeforeLongBreak === 0) {
              return {
                timeLeft: state.longBreakDuration,
                isRunning: false,
                mode: 'longBreak',
                pomodoroCount: newCount,
                history: [...state.history, Date.now()],
                stats: todayStats,
                points: newPoints,
                badges: newBadges,
              };
            } else {
              return {
                timeLeft: state.shortBreakDuration,
                isRunning: false,
                mode: 'shortBreak',
                pomodoroCount: newCount,
                history: [...state.history, Date.now()],
                stats: todayStats,
                points: newPoints,
                badges: newBadges,
              };
            }
          } else {
            // Fin de pause (courte ou longue) => retour pomodoro
            return {
              timeLeft: state.pomodoroDuration,
              isRunning: false,
              mode: 'pomodoro',
            };
          }
        }
        return { timeLeft: state.timeLeft - 1 };
      });
    },
    setPomodoroDuration: (n: number) => set((s) => ({ pomodoroDuration: n, timeLeft: s.mode === 'pomodoro' ? n : s.timeLeft })),
    setShortBreakDuration: (n: number) => set((s) => ({ shortBreakDuration: n, timeLeft: s.mode === 'shortBreak' ? n : s.timeLeft })),
    setLongBreakDuration: (n: number) => set((s) => ({ longBreakDuration: n, timeLeft: s.mode === 'longBreak' ? n : s.timeLeft })),
    setPomodorosBeforeLongBreak: (n: number) => set((s) => ({ pomodorosBeforeLongBreak: n })),
    addTask: (t: string) => set((s) => ({ tasks: [...s.tasks, { id: crypto.randomUUID(), label: t, done: false }] })),
    removeTask: (id: string) => set((s) => ({ tasks: s.tasks.filter((task) => task.id !== id) })),
    toggleTask: (id: string) => set((s) => ({ tasks: s.tasks.map((task) => task.id === id ? { ...task, done: !task.done } : task) })),
  };
});

function updateStats(
  stats: { day: string; sessions: number }[],
  timestamp: number,
) {
  const day = new Date(timestamp).toLocaleDateString();
  const existing = stats.find((s) => s.day === day);
  if (existing) {
    existing.sessions += 1;
    return [...stats];
  }
  return [...stats, { day, sessions: 1 }];
}
