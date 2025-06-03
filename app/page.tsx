import Timer from '../components/Timer';
import TaskList from '../components/TaskList';

export default function Home() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Timer />
      <TaskList />
    </div>
  );
}
