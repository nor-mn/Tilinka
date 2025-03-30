"use client";

import BarChart from "@/components/BarChart";
import ParticipantsList from "@/components/ParticipantsList";

// app/dashboard/page.tsx
export default function DashboardPage() {
  return <div className="py-4 px-6 content-start">
    {/* Número de partidas iniciadas 
    numero de partidas terminadas
    tiempo de juego por partida */}
    <p className="text-[30px]">Dashboard</p>
    <div className="p-3 h-70 rounded-xl border border-gray-900 bg-gradient-to-br from-amber-200/5 from-0% via-cyan-200">
      <p className="text-xl">Tiempo de juego por partida</p>
      <BarChart/>
    </div>
    <br />
    <div className="grid grid-cols-3 gap-4 p-5 rounded-xl border border-gray-900 bg-gradient-to-br from-amber-200/5 from-0% via-palette-005">
      <p className="col-span-3 text-xl">Número de partidas</p>
      <div className="p-2 rounded-xl border border-gray-900 bg-gray-50">
        <BarChart />
      </div>
      <div className="p-2 rounded-xl border border-gray-900 bg-gray-50">
        <BarChart />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-2 rounded-xl text-center border border-gray-900 bg-gray-50">
          <small>Iniciadas</small> <br />
          <strong className="text-5xl">32</strong>
        </div>
        <div className="p-2 rounded-xl text-center border border-gray-900 bg-gray-50">
          <small>Terminadas</small> <br />
          <strong className="text-5xl">32</strong>
        </div>
        <div className="p-2 rounded-xl text-center border border-gray-900 bg-gray-50">
          <small>terminadas</small> <br />
          <strong className="text-5xl">32</strong>
        </div>
        <div className="p-2 rounded-xl text-center border border-gray-900 bg-gray-50">
          <small>terminadas</small> <br />
          <strong className="text-5xl">32</strong>
        </div>
      </div>
    </div>
    <div>
      {/* <ParticipantsList/> */}
    </div>
  </div>;
}
