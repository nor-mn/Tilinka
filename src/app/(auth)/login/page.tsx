"use client";

import { useAuth } from "@/context/AuthContext";
import { X } from "lucide-react";
import React, { useState } from "react";

export default function LoginPage() {
  const { login, error, setError } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await login(email, password);
    setLoading(false);
  };
  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-md border border-gray-900  rounded-2xl overflow-hidden shadow-lg bg-gradient-to-tl from-rose-100 from-0% via-emerald-200/60 via-50%">

        <div className="flex flex-cols justify-center bg-gray-900 p-4">
          <img 
            className="h-12 w-auto mr-3"
            src="/logo.png"
            alt="Tilinka"
          />
          <h1 className="text-white text-2xl font-semibold mt-2">Inicio de Sesión</h1>
        </div>

        <form onSubmit={handleLogin} className="p-10">
          {error && 
            <div className="mb-3 flex justify-between p-2 rounded-xl border border-red-700 bg-red-300 text-red-700">
              <small>{error}</small>
              <button type="button" onClick={()=>setError(null)}>
                <X/>
              </button>
          </div>
          }
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-800">
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2.5 mt-1 border border-gray-900 rounded-lg text-gray-900 bg-white focus:ring-palette-003 focus:border-palette-003"
              placeholder="correo@ejemplo.com"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-800">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2.5 mt-1 border border-gray-900 rounded-lg bg-white text-gray-900 focus:ring-palette-003 focus:border-palette-003"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full text-white bg-gray-900 hover:bg-gray-800 font-medium rounded-lg text-sm px-5 py-2.5 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Enviando..." : "Iniciar Sesión"}
          </button>
        </form>
      </div>
    </div>
  );
}
