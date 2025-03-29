'use client';
import UsersList from '@/components/UsersList';
import React, { useState } from 'react';
import AddAppButton from "@/components/AddAppButton";
import { BadgePlus } from 'lucide-react';
import { Modal } from '@/components/Modal';

export default function UsersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const handleButton = () => {
    setIsModalOpen(false)
  }
  return (
    <div className='py-4 px-6 overflow-hidden'>
      <div className='flex justify-between mb-2'>
      <p className="text-[30px]">Lista de usuarios</p>
      <button  onClick={openModal} className='flex  rounded-2xl border border-gray-900 items-center p-1 cursor-pointer bg-palette-003/70 hover:bg-palette-003'>
      <BadgePlus/>
          Añadir Usuario
      </button>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} title="Añadir Usuario"
      button={
        <button
            type="submit"
            className="cursor-pointer bg-blue-500 text-white py-2 px-4 rounded-md"
            onClick={handleButton}
          >
            Añadir
          </button>
      }
      >
        <form>
        <input
            type="text"
            placeholder="Nombre del usuario"
            className="border p-2 mb-4 w-full"
          />
        </form>
      </Modal>
      <UsersList/>
    </div>
  )
}
