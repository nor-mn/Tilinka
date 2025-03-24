import React, { useState } from 'react'
import { useAuth } from '@/context/AuthContext';
import Loading from "@/components/Loading";

export const Header = () => {
  const [loading, setLoading] = useState(false);
  const { user, logout } = useAuth();
  const handleClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000); // Simulación de carga
};
  console.log(user,'us')
  return (
    <nav className='fixed h-15 bg-gray-300 w-full'>Menu dashboardsf
     {user?.email}
     <button onClick={handleClick} className='p-2 cursor-pointer border border-gray-800 rounded bg-gradient-to-br from-red-300 from- via-violet-100 via-50% to-cyan-300 to- text-gray-900' >
        {!loading?<Loading small text='Cerrar Sesión'/>:"Cerrar Sesión"}
      </button>
    </nav>
  )
}
