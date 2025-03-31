import MyAppsList from '@/components/MyAppsList'
import useProtectedRoute from '@/hooks/useProtectedRoute';
import React from 'react'

export default function MyApps() {
  return (
    <div className="py-4 px-6">
      <p className='text-[30px]'>Mis aplicaciones</p>
        <MyAppsList/>
    </div>
  )
}
