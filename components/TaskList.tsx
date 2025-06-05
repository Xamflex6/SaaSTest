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
    <div className="space-y-6 w-full max-w-full mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 w-full">
        <Input 
          placeholder="Nouvelle tâche" 
          {...register('task')} 
          className="w-full text-base py-3 px-4" 
        />
        <Button 
          type="submit" 
          className="hover:scale-105 active:scale-95 transition-transform duration-150 w-full py-3 text-base"
        >
          Ajouter
        </Button>
      </form>
      {errors.task && <p className="text-red-500 text-sm italic animate-pulse">{errors.task.message}</p>}
      
      <div className="max-h-[350px] overflow-y-auto pr-2">
        <ul className="space-y-3">
          <AnimatePresence>
            {sortedTasks.map((t) => (
              <motion.li
                key={t.id}
                {...({
                  className: `flex items-center justify-between gap-3 p-4 border border-zinc-700 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors group shadow-sm ${t.done ? 'opacity-60' : ''}`
                } as HTMLMotionProps<'li'>)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <input
                    type="checkbox"
                    checked={t.done}
                    onChange={() => toggleTask(t.id)}
                    className="accent-blue-500 w-5 h-5 rounded border-zinc-600 focus:ring-2 focus:ring-blue-500 transition flex-shrink-0"
                  />
                  <span className={`text-base leading-relaxed group-hover:text-blue-400 transition-colors break-words ${t.done ? 'line-through text-zinc-400' : 'text-zinc-200'}`}>
                    {t.label}
                  </span>
                </div>
                <Button 
                  variant="ghost" 
                  onClick={() => removeTask(t.id)} 
                  className="text-zinc-400 hover:text-red-400 hover:bg-red-400/10 transition-colors p-2 flex-shrink-0"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M7.293 7.293a1 1 0 011.414 0L10 8.586l1.293-1.293a1 1 0 111.414 1.414L11.414 10l1.293 1.293a1 1 0 01-1.414 1.414L10 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L8.586 10 7.293 8.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Button>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
        
        {tasks.length === 0 && (
          <div className="text-center text-zinc-400 py-8">
            <p className="text-lg">Aucune tâche pour le moment</p>
            <p className="text-sm mt-2">Ajoutez une tâche pour commencer votre session Pomodoro</p>
          </div>
        )}
      </div>
    </div>
  );
}
