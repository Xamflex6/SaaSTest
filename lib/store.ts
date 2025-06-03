import { create } from 'zustand';

interface PomodoroState {
  timeLeft: number;
  isRunning: boolean;
  tasks: string[];
  history: number[];
  stats: { day: string; sessions: number }[];
  start: () => void;
  pause: () => void;
  reset: () => void;
  tick: () => void;
  addTask: (t: string) => void;
  removeTask: (i: number) => void;
}

export const usePomodoroStore = create<PomodoroState>((set, get) => {
  let timer: NodeJS.Timeout;
  return {
    timeLeft: 1500,
    isRunning: false,
    tasks: [],
    history: [],
    stats: [],
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
      set({ timeLeft: 1500, isRunning: false });
    },
    tick: () => {
      set((state) => {
        if (state.timeLeft <= 1) {
          clearInterval(timer);
          const now = Date.now();
          return {
            timeLeft: 1500,
            isRunning: false,
            history: [...state.history, now],
            stats: updateStats(state.stats, now),
          };
        }
        return { timeLeft: state.timeLeft - 1 };
      });
    },
    addTask: (t: string) => set((s) => ({ tasks: [...s.tasks, t] })),
    removeTask: (i: number) =>
      set((s) => ({ tasks: s.tasks.filter((_, idx) => idx !== i) })),
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
