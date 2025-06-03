'use client';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { usePomodoroStore } from '../lib/store';
import { Button, Input } from './ui';
import { AnimatePresence, motion } from 'framer-motion';

const schema = z.object({ task: z.string().min(1) });

type FormData = z.infer<typeof schema>;

export default function TaskList() {
  const { tasks, addTask, removeTask } = usePomodoroStore();
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

  return (
    <div className="space-y-2">
      <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
        <Input placeholder="Nouvelle tâche" {...register('task')} />
        <Button type="submit" className="hover:scale-105 active:scale-95 transition-transform duration-150">Ajouter</Button>
      </form>
      {errors.task && <p className="text-red-500 text-sm italic animate-pulse">{errors.task.message}</p>}
      <ul className="space-y-1">
        <AnimatePresence>
          {tasks.map((t, i) => (
            <motion.li
              key={t}
              className="flex justify-between items-center p-2 border border-zinc-700 rounded bg-zinc-800 hover:bg-zinc-700 transition-colors group shadow-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <span className="truncate group-hover:text-blue-400 transition-colors">{t}</span>
              <Button variant="ghost" onClick={() => removeTask(i)} className="text-red-400 hover:text-red-600 hover:bg-red-100/10 transition-colors">Supprimer</Button>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}
