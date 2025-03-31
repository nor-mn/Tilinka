"use client";
import UsersList from "@/components/UsersList";
import React, { useState } from "react";
import { BadgePlus } from "lucide-react";
import { Modal } from "@/components/Modal";
import { useAuth } from "@/context/AuthContext";
import useProtectedRoute from "@/hooks/useProtectedRoute";

export default function UsersPage() {
  const { isAllowed, loading: loadingAuth } = useProtectedRoute(["admin"]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { register, loading } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    company: "",
    phone_number: "",
  });
  const [error, setError] = useState("");
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  if (loadingAuth) return <p>Cargando...</p>;
  if (!isAllowed) return null; 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
    console.log(formData)
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    console.log("enviando datos: ", formData);
    try {
      await register(
        formData.email,
        formData.password,
        formData.username,
        formData.phone_number,
        formData.company
      );
      closeModal();
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="py-4 px-6 overflow-hidden">
      <div className="flex justify-between mb-2">
        <p className="text-[30px]">Lista de usuarios</p>
        <button
          onClick={openModal}
          className="flex  rounded-2xl border border-gray-900 items-center p-1 cursor-pointer bg-palette-003/70 hover:bg-palette-003"
        >
          <BadgePlus />
          Añadir Usuario
        </button>
      </div>
      <div>
      
    </div>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Añadir Usuario">
        <form onSubmit={handleSubmit}>
          {error && <p className="text-red-500">{error}</p>}
          <div className="grid gap-1">
            <small>Correo electrónico:</small>
            <input
              type="email"
              name="email"
              className="border rounded-xl h-10 border-gray-900 px-2"
              onChange={handleChange}
            />
            <small>Contraseña:</small>
            <input
              type="password"
              name="password"
              className="border rounded-xl h-10 border-gray-900 px-2"
              onChange={handleChange}
            />
            <small>Nombre de usuario:</small>
            <input
              type="text"
              name="username"
              className="border rounded-xl h-10 border-gray-900 px-2"
              onChange={handleChange}
            />
            <small>Nombre de compañia:</small>
            <input
              type="text"
              name="company"
              className="border rounded-xl h-10 border-gray-900 px-2"
              onChange={handleChange}
            />
            <small>Número contacto:</small>
            <input
              type="text"
              name="phone_number"
              className="border rounded-xl h-10 border-gray-900 px-2"
              onChange={handleChange}
            />
          </div>
          <div>
          <button
            disabled={loading}
            type="submit"
            className="rounded-2xl  border border-gray-900 cursor-pointer bg-palette-003/70 hover:bg-palette-003 py-2 px-4"
          >
            {loading? "añadiendo usuario...":"Añadir"}
          </button>
          </div>
        </form>
      </Modal>
      <UsersList />
    </div>
  );
}
