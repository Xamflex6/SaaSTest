import dynamic from 'next/dynamic';
import { SessionHistory } from '../../components/SessionHistory';

const Charts = dynamic(() => import('../../components/StatsCharts'), { ssr: false });

export default function Dashboard() {
  return (
    <div className="space-y-4">
      <Charts />
      <SessionHistory />
    </div>
  );
}
