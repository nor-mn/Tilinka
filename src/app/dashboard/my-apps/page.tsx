import MyAppsList from '@/components/MyAppsList'
import React from 'react'

export default function MyApps() {
  return (
    <div className="p-6 grid grid-cols-6 gap-4">
        <MyAppsList/>
    </div>
  )
}
