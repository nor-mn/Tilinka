'use client';
import GameTimeChart from '@/components/charts/GameTimeChart';
import GameCountChart from '@/components/charts/GameCountChart';
import GameFrequencyChart from '@/components/charts/GameFrequencyChart';
import ParticipantsList from '@/components/ParticipantsList';
import { useMyApps } from '@/hooks/useMyApps';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AppDetails() {
  const pathname = usePathname();
  const id = pathname?.split('/').pop();
  const { getByIdMyApp, loading, myApp } = useMyApps();
  const [countParticipant, setCountParticipant] = useState(0);
  const [totalTime, setTotalTime] = useState<string>('00:00');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (id && typeof id === 'string' && !isLoaded) {
      getByIdMyApp(id);
      setIsLoaded(true);
    }
  }, [id, myApp, isLoaded]);

  if (loading) {
    return <div className="text-center py-10 text-lg">Loading...</div>;
  }

  if (!myApp) {
    return null;
  }

  return (
    <div className="py-4 px-6">
      <p className="text-2xl sm:text-3xl font-semibold">Dashboard: {myApp.name}</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-5 rounded-xl border border-gray-900 bg-gradient-to-br from-amber-100 via-cyan-200">
        {[
          { label: "Total de partidas iniciadas", value: myApp.totalStartedGames },
          { label: "Total de partidas terminadas", value: myApp.totalFinishedGames },
          { label: "Total de participantes", value: countParticipant },
          { label: "Total del tiempo de juego", value: totalTime },
        ].map((item, index) => (
          <div key={index} className="flex flex-col justify-between p-4 rounded-xl text-center border border-gray-900 bg-gray-50">
            <p>{item.label}</p>
            <strong className="text-4xl sm:text-5xl mt-auto">{item.value}</strong>
          </div>
        ))}
        
      </div>

      <div className="mt-4 p-6 rounded-xl border border-gray-900 bg-gray-50">
        <GameTimeChart myAppId={id} />
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 p-5 rounded-xl border border-gray-900 bg-gradient-to-br from-amber-100 via-palette-005/80">
        {/* <p className="col-span-1 md:col-span-3 text-xl font-semibold">Número de partidas</p> */}
        <div className="p-2 rounded-xl border border-gray-900 bg-gray-50">
          <GameCountChart myAppId={id} setTotalTime={setTotalTime} />
        </div>
        <div className="p-2 md:col-span-2 rounded-xl border border-gray-900 bg-gray-50">
          <GameFrequencyChart myAppId={id} />
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-gray-900 p-5 bg-gradient-to-br from-amber-100 via-emerald-300">
        <div className="p-6 rounded-xl border border-gray-900 bg-gray-50">
          <ParticipantsList myAppId={id} setCount={setCountParticipant} />
        </div>
      </div>
    </div>
  );
}
