'use client';
import { usePomodoroStore } from '../lib/store';
import { Button, Input } from './ui';
import { useState } from 'react';

interface TimerConfigData {
  pomodoroDuration: number; // en minutes
  shortBreakDuration: number; // en minutes
  longBreakDuration: number; // en minutes
  pomodorosBeforeLongBreak: number;
}

export default function TimerConfig() {
  const {
    pomodoroDuration,
    shortBreakDuration,
    longBreakDuration,
    pomodorosBeforeLongBreak,
    setPomodoroDuration,
    setShortBreakDuration,
    setLongBreakDuration,
    setPomodorosBeforeLongBreak,
  } = usePomodoroStore();

  const [importError, setImportError] = useState<string>('');
  const [importSuccess, setImportSuccess] = useState<string>('');

  const exportConfig = () => {
    const config: TimerConfigData = {
      pomodoroDuration: Math.round(pomodoroDuration / 60),
      shortBreakDuration: Math.round(shortBreakDuration / 60),
      longBreakDuration: Math.round(longBreakDuration / 60),
      pomodorosBeforeLongBreak,
    };

    const csvContent = [
      'setting,value',
      `pomodoroDuration,${config.pomodoroDuration}`,
      `shortBreakDuration,${config.shortBreakDuration}`,
      `longBreakDuration,${config.longBreakDuration}`,
      `pomodorosBeforeLongBreak,${config.pomodorosBeforeLongBreak}`,
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'pomodoro-config.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const importConfig = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setImportError('');
    setImportSuccess('');

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const lines = text.split('\n').filter(line => line.trim());
        
        if (lines.length === 0 || !lines[0].includes('setting,value')) {
          throw new Error('Format CSV invalide. Le fichier doit contenir un en-tête "setting,value".');
        }

        const config: Partial<TimerConfigData> = {};
        
        for (let i = 1; i < lines.length; i++) {
          const [setting, value] = lines[i].split(',');
          if (!setting || !value) continue;
          
          const numValue = parseInt(value.trim());
          if (isNaN(numValue)) {
            throw new Error(`Valeur invalide pour ${setting}: ${value}`);
          }

          switch (setting.trim()) {
            case 'pomodoroDuration':
              if (numValue < 1 || numValue > 60) {
                throw new Error('La durée du Pomodoro doit être entre 1 et 60 minutes');
              }
              config.pomodoroDuration = numValue;
              break;
            case 'shortBreakDuration':
              if (numValue < 1 || numValue > 30) {
                throw new Error('La durée de la pause courte doit être entre 1 et 30 minutes');
              }
              config.shortBreakDuration = numValue;
              break;
            case 'longBreakDuration':
              if (numValue < 1 || numValue > 60) {
                throw new Error('La durée de la pause longue doit être entre 1 et 60 minutes');
              }
              config.longBreakDuration = numValue;
              break;
            case 'pomodorosBeforeLongBreak':
              if (numValue < 1 || numValue > 10) {
                throw new Error('Le nombre de Pomodoros avant pause longue doit être entre 1 et 10');
              }
              config.pomodorosBeforeLongBreak = numValue;
              break;
          }
        }

        // Appliquer la configuration
        if (config.pomodoroDuration !== undefined) {
          setPomodoroDuration(config.pomodoroDuration * 60);
        }
        if (config.shortBreakDuration !== undefined) {
          setShortBreakDuration(config.shortBreakDuration * 60);
        }
        if (config.longBreakDuration !== undefined) {
          setLongBreakDuration(config.longBreakDuration * 60);
        }
        if (config.pomodorosBeforeLongBreak !== undefined) {
          setPomodorosBeforeLongBreak(config.pomodorosBeforeLongBreak);
        }

        setImportSuccess('Configuration importée avec succès !');
      } catch (error) {
        setImportError(error instanceof Error ? error.message : 'Erreur lors de l\'import du fichier');
      }
    };

    reader.readAsText(file);
    // Reset le input file
    event.target.value = '';
  };

  return (
    <div className="space-y-8 w-full max-w-2xl mx-auto">
      {/* Configuration manuelle */}
      <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-6">
        <h2 className="text-xl font-bold text-zinc-200 mb-6">Configuration du Timer</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <label className="flex flex-col gap-2 text-zinc-300">
              <span className="font-medium">Durée Pomodoro (minutes)</span>
              <Input
                type="number"
                min={1}
                max={60}
                value={Math.round(pomodoroDuration / 60)}
                onChange={e => setPomodoroDuration(Number(e.target.value) * 60)}
                className="w-full"
              />
            </label>
            <label className="flex flex-col gap-2 text-zinc-300">
              <span className="font-medium">Pause courte (minutes)</span>
              <Input
                type="number"
                min={1}
                max={30}
                value={Math.round(shortBreakDuration / 60)}
                onChange={e => setShortBreakDuration(Number(e.target.value) * 60)}
                className="w-full"
              />
            </label>
          </div>
          <div className="space-y-4">
            <label className="flex flex-col gap-2 text-zinc-300">
              <span className="font-medium">Pause longue (minutes)</span>
              <Input
                type="number"
                min={1}
                max={60}
                value={Math.round(longBreakDuration / 60)}
                onChange={e => setLongBreakDuration(Number(e.target.value) * 60)}
                className="w-full"
              />
            </label>
            <label className="flex flex-col gap-2 text-zinc-300">
              <span className="font-medium">Pomodoros avant pause longue</span>
              <Input
                type="number"
                min={1}
                max={10}
                value={pomodorosBeforeLongBreak}
                onChange={e => setPomodorosBeforeLongBreak(Number(e.target.value))}
                className="w-full"
              />
            </label>
          </div>
        </div>
      </div>

      {/* Import/Export */}
      <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-6">
        <h2 className="text-xl font-bold text-zinc-200 mb-6">Import / Export Configuration</h2>
        
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">            <Button onClick={exportConfig} className="flex-1">
              Exporter la configuration (CSV)
            </Button>
            <div className="flex-1">
              <input
                type="file"
                accept=".csv"
                onChange={importConfig}
                className="hidden"
                id="import-config"
              />              <label htmlFor="import-config">
                <span className="inline-flex items-center justify-center rounded-lg px-5 py-2 text-base font-semibold shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed bg-zinc-700 text-zinc-100 hover:bg-zinc-600 active:scale-95 focus:ring-zinc-400 w-full cursor-pointer">
                  Importer une configuration (CSV)
                </span>
              </label>
            </div>
          </div>

          {importError && (
            <div className="bg-red-900/20 border border-red-700 rounded-lg p-3 text-red-300 text-sm">
              {importError}
            </div>
          )}

          {importSuccess && (
            <div className="bg-green-900/20 border border-green-700 rounded-lg p-3 text-green-300 text-sm">
              {importSuccess}
            </div>
          )}

          <div className="text-zinc-400 text-xs space-y-1">
            <p><strong>Format CSV attendu :</strong></p>
            <pre className="bg-zinc-900 p-2 rounded text-xs overflow-x-auto">
{`setting,value
pomodoroDuration,25
shortBreakDuration,5
longBreakDuration,15
pomodorosBeforeLongBreak,4`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
