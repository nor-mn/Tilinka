import React, { ReactNode } from 'react';
interface Props {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
}

export const Modal = ({ isOpen, onClose, title, children}: Props) => {
    if(!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 bg-opacity-50">
      <div className="bg-white rounded-lg w-96">
        <div className='bg-gray-900 rounded-t-lg p-3 text-gray-100 text-center'>
        <h2 className="text-xl">{title}</h2>
        </div>
        <div className="p-6 border border-gray-900 rounded-b-lg">
        {children}
        <div className="mt-4 flex justify-between">
          <button
            onClick={onClose}
            className=" border border-gray-900 cursor-pointer bg-gray-400 py-2 px-4 rounded-2xl"
          >
            Cancelar
          </button>
        </div>
        </div>
      </div>
    </div>
  )
}
