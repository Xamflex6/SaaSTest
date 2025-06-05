import TimerConfig from '../../components/TimerConfig';
import Link from 'next/link';
import { Button } from '../../components/ui';

export default function ConfigPage() {
  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Configuration du Timer</h1>
            <p className="text-zinc-400">
              Personnalisez les durées de votre technique Pomodoro
            </p>
          </div>          <Link href="/">
            <Button variant="ghost">
              ← Retour au timer
            </Button>
          </Link>
        </div>

        {/* Configuration */}
        <TimerConfig />
      </div>
    </div>
  );
}