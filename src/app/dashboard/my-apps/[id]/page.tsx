'use client';
import BarChart from '@/components/BarChart';
import ParticipantsList from '@/components/ParticipantsList';
import { useUserApps } from '@/hooks/useUserApps';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AppDetails() {
    const pathname = usePathname();
    const id = pathname?.split('/').pop();
    const { getMyApp, loading, myApp } = useUserApps();
    const [ countParticipant, setCountParticipant] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    console.log(id)
    useEffect(() => {
      if (id && typeof id === 'string' && !isLoaded) {
        getMyApp(id);
        setIsLoaded(true)
      }
    }, [id, myApp, isLoaded]);
    
    if(loading){
      return <div>Loading ...</div>
    }

    if(!myApp){
      return;
    }
    
    
  return (
    <div className='py-4 px-6'>
      <p className='text-[30px]'>Aplicación: { myApp.name }</p>
      <div className="grid grid-cols-3 gap-4 p-5 rounded-xl border border-gray-900 bg-gradient-to-br from-amber-200/5 from-0% via-palette-005">
      <p className="col-span-3 text-xl">Número de partidas</p>
      <div className="p-2 col-span-2 rounded-xl border border-gray-900 bg-gray-50">
        <BarChart />
      </div>
      <div className="grid gap-2">
        <div className="p-2 rounded-xl text-center border border-gray-900 bg-gray-50">
          <small>Tiempo total de juego</small> <br />
          <strong className="text-5xl">{myApp.totalGamePlayTime}</strong>
        </div>
        <div className="p-2 rounded-xl text-center border border-gray-900 bg-gray-50">
          <small>Total de partidas iniciadas</small> <br />
          <strong className="text-5xl">{myApp.totalStartedGames}</strong>
        </div>
        <div className="p-2 rounded-xl text-center border border-gray-900 bg-gray-50">
          <small>Total de partidas terminadas</small> <br />
          <strong className="text-5xl">{myApp.totalFinishedGames}</strong>
        </div>
        <div className="p-2 rounded-xl text-center border border-gray-900 bg-gray-50">
          <small>Total de participantes</small> <br />
          <strong className="text-5xl">{countParticipant}</strong>
        </div>
      </div>
    </div>
    <div className='mt-2 rounded-xl border border-gray-900 p-5'>
    <ParticipantsList myAppId={id} setCount={setCountParticipant}/>
    </div>
    </div>
  )
}
