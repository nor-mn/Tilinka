import UsersList from '@/components/UsersList'
import React from 'react'
import AddAppButton from "@/components/AddAppButton";

export default function UsersPage() {
  return (
    <div className='py-4 px-6 flex justify-center'>
      <UsersList/>
    </div>
  )
}
