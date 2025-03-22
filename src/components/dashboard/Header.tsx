import { useAuth } from '@/context/AuthContext';
import React from 'react'

export const Header = () => {
  const { user, logout } = useAuth();
  console.log(user,'us')
  return (
    <nav className='fixed h-15 bg-gray-300 w-full'>Menu dashboardsf
     {user?.email}
     <button onClick={logout} className='bg-red-500 text-white p-2' >Cerrar Sesión</button>
    </nav>
  )
}
