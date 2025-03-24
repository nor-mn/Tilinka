import React, { useState } from 'react'
import { useAuth } from '@/context/AuthContext';
import Loading from "@/components/Loading";
import { ChevronDown, Lock, LogOut, User } from 'lucide-react';

export const Header = () => {
  return (
    <nav className='flex flex-row-reverse h-15 bg-gray-300 w-full'>
      <UserDropdown/>
    </nav>
  )
}


const UserDropdown = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const handleClick = () => {
    setLoading(true);
    logout();
    setTimeout(() => setLoading(false), 2000);
  };
  console.log(user,'us')
  return (
    <>
    <div className="relative inline-block m-2">
      <button
        className="flex items-center gap-2 px-4 py-2 cursor-pointer rounded border border-gray-900 text-gray-900 bg-cyan-100 hover:bg-cyan-200"
        onClick={() => setOpen(!open)}
        >
        {user?.email} <ChevronDown size={18} />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg">
          <ul className="py-2 text-sm text-gray-800">
            <li className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer">
              Perfil
            </li>
            {/* <li className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer">
              Cambio de contraseña
            </li> */}
            <li
              className="flex items-center gap-2 px-4 py-2 hover:bg-red-100 text-red-600 cursor-pointer"
              onClick={handleClick}
            >
              { loading?<Loading fullScreen/>:<><LogOut size={16} /> Cerrar sesión</>}
            </li>
          </ul>
        </div>
      )}
    </div>
    </>
  );
}