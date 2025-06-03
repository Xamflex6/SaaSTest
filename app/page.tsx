import Timer from '../components/Timer';
import TaskList from '../components/TaskList';

export default function Home() {
  return (
    <div className="grid gap-8 md:grid-cols-2 p-4 md:p-8 bg-zinc-800 rounded-xl shadow-lg border border-zinc-700 transition hover:shadow-2xl">
      <Timer />
      <TaskList />
    </div>
  );
}
