'use client';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { usePomodoroStore } from '../lib/store';
import { Button, Input } from '@shadcn/ui';
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
        <Input placeholder="New task" {...register('task')} />
        <Button type="submit">Add</Button>
      </form>
      {errors.task && <p className="text-red-500">{errors.task.message}</p>}
      <ul className="space-y-1">
        <AnimatePresence>
          {tasks.map((t, i) => (
            <motion.li
              key={t}
              className="flex justify-between p-2 border rounded"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {t}
              <Button variant="ghost" onClick={() => removeTask(i)}>
                Remove
              </Button>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}
