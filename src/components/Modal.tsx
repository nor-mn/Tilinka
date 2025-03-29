import React, { ReactNode } from 'react';
interface Props {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
    button: ReactNode;
}

export const Modal = ({ isOpen, onClose, title, children, button}: Props) => {
    if(!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl mb-4">{title}</h2>
        <div>{children}</div>
        <div className="mt-4 flex justify-between">
            {button}
          <button
            onClick={onClose}
            className="cursor-pointer bg-gray-500 text-white py-2 px-4 rounded-md"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  )
}
