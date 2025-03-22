"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    role: "",
    company: ""
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value});
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await register(formData.email, formData.password, formData.username, formData.role, formData.company);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    }
  };
  return (
      <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl mb-4">Registro</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      {error && <p className="text-red-500">{error}</p>}
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Contraseña" onChange={handleChange} required />
        <input type="text" name="username" placeholder="Nombre de usuario" onChange={handleChange} required />
        <input type="text" name="role" placeholder="Rol" onChange={handleChange} required />
        <input type="text" name="company" placeholder="Empresa" onChange={handleChange} required />
        <button type="submit" className="bg-blue-500 text-white p-2">Registrarse</button>
      </form>
    </div>
  );
}