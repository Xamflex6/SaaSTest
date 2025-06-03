'use client';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from 'recharts';
import { usePomodoroStore } from '../lib/store';

export default function StatsCharts() {
  const { stats } = usePomodoroStore();
  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={stats}>
          <XAxis dataKey="day" />
          <YAxis />
          <Bar dataKey="sessions" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
