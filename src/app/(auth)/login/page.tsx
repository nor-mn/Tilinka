"use client";

import { useAuth } from "@/context/AuthContext";
import React, { useState } from "react";

export default function LoginPage() {
  const { login, error } = useAuth();
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
    <div className="flex justify-center pt-20">
      <div className="mx-auto border rounded-2xl border-gray-900 overflow-hidden shadow-2xl bg-gradient-to-tl from-rose-100 from-0% via-emerald-200/60 via-50%">
        <div className="flex flex-cols-[20%_1fr] bg-gray-900">
          <img className="h-13 w-auto m-auto" src="../assets/LogoNegroW.png" alt="Tilinka" />
          <h3 className="p-5 text-center">Inicio de Sesión</h3>
        </div>
        <form onSubmit={handleLogin}>
        <div className="px-20 py-10">
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-800"
            >
              Correo electrónico
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@flowbite.com"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-800"
            >
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full text-white bg-gray-900 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            disabled={loading}
          >
            Enviar
          </button>
        </div>
        </form>
      </div>
    </div>
  );
}
