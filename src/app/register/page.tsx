"use client";

import { useState } from "react";
import { signup } from "@/app/auth/actions";
import Link from "next/link";

export default function RegisterPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const res = await signup(formData);

    if (res?.error) {
      setError(res.error);
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8 max-w-md w-full shadow-xl">
        <h1 className="text-3xl font-extrabold text-center mb-6 text-yellow-400">
          Crear Cuenta
        </h1>

        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-300 text-sm p-3 rounded-lg mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Correo electrónico
            </label>
            <input
              type="email"
              name="email"
              required
              className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-yellow-400"
              placeholder="tu@correo.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Contraseña</label>
            <input
              type="password"
              name="password"
              required
              minLength={6}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-yellow-400"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold py-3 rounded-lg transition-colors disabled:opacity-50"
          >
            {loading ? "Registrando..." : "Registrarse"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-6">
          ¿Ya tienes una cuenta?{" "}
          <Link href="/login" className="text-yellow-400 hover:underline">
            Inicia sesión aquí
          </Link>
        </p>
      </div>
    </main>
  );
}
