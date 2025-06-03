'use client';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { usePomodoroStore, Task } from '../lib/store';
import { Button, Input } from './ui';
import { AnimatePresence, motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';

const schema = z.object({ task: z.string().min(1) });

type FormData = z.infer<typeof schema>;

export default function TaskList() {
  const { tasks, addTask, removeTask, toggleTask } = usePomodoroStore();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FormData) => {
    addTask(data.task);
    reset();
  };

  // Tri : en cours d'abord, puis terminées
  const sortedTasks = [...tasks].sort((a, b) => Number(a.done) - Number(b.done));

  return (
    <div className="space-y-4 w-full max-w-lg mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-2 w-full">
        <Input placeholder="Nouvelle tâche" {...register('task')} className="flex-1 min-w-0" />
        <Button type="submit" className="hover:scale-105 active:scale-95 transition-transform duration-150 w-full sm:w-auto">Ajouter</Button>
      </form>
      {errors.task && <p className="text-red-500 text-sm italic animate-pulse">{errors.task.message}</p>}
      <ul className="space-y-1 max-h-[480px] overflow-y-auto pr-1">
        <AnimatePresence>
          {sortedTasks.map((t) => (
            <motion.li
              key={t.id}
              {...({
                className: `flex flex-col sm:flex-row items-center justify-between gap-2 p-2 border border-zinc-700 rounded bg-zinc-800 hover:bg-zinc-700 transition-colors group shadow-sm ${t.done ? 'opacity-60' : ''}`
              } as HTMLMotionProps<'li'>)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex items-center gap-2 flex-1 min-w-0 w-full">
                <input
                  type="checkbox"
                  checked={t.done}
                  onChange={() => toggleTask(t.id)}
                  className="accent-blue-500 w-5 h-5 rounded border-zinc-600 focus:ring-2 focus:ring-blue-500 transition"
                />
                <span className={`truncate group-hover:text-blue-400 transition-colors ${t.done ? 'line-through text-zinc-400' : ''}`}>{t.label}</span>
              </div>
              <Button variant="ghost" onClick={() => removeTask(t.id)} className="text-zinc-400 hover:text-blue-400 hover:bg-blue-400/10 transition-colors p-2 w-full sm:w-auto">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M7.293 7.293a1 1 0 011.414 0L10 8.586l1.293-1.293a1 1 0 111.414 1.414L11.414 10l1.293 1.293a1 1 0 01-1.414 1.414L10 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L8.586 10 7.293 8.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Button>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}
