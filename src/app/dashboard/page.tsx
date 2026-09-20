import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { logout } from "@/app/auth/actions";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-3xl mx-auto bg-gray-800 border border-gray-700 rounded-2xl p-8 shadow-2xl">
        <div className="flex items-center justify-between border-b border-gray-700 pb-6 mb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-yellow-400">
              Panel de Usuario
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              Ruta Privada y Protegida por Cookies httpOnly
            </p>
          </div>

          <form action={logout}>
            <button
              type="submit"
              className="bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/50 font-bold px-4 py-2 rounded-lg transition-colors text-sm"
            >
              Cerrar Sesión
            </button>
          </form>
        </div>

        <div className="space-y-4">
          <div className="bg-gray-900/60 p-4 rounded-xl border border-gray-700/50">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
              ID de Usuario (UID)
            </h2>
            <p className="text-yellow-400 font-mono text-sm break-all">
              {user.id}
            </p>
          </div>

          <div className="bg-gray-900/60 p-4 rounded-xl border border-gray-700/50">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
              Correo Electrónico
            </h2>
            <p className="text-white text-base font-semibold">{user.email}</p>
          </div>

          <div className="bg-gray-900/60 p-4 rounded-xl border border-gray-700/50">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
              Último Inicio de Sesión
            </h2>
            <p className="text-gray-300 text-sm">
              {user.last_sign_in_at
                ? new Date(user.last_sign_in_at).toLocaleString("es-ES")
                : "Primera sesión"}
            </p>
          </div>
        </div>

        <div className="mt-8 bg-green-500/10 border border-green-500/30 rounded-xl p-4 text-green-300 text-xs">
          <strong>Seguridad Verificada:</strong> Tu sesión está almacenada en
          cookies <code>httpOnly</code> cifradas en el servidor. Los tokens no
          son accesibles desde JavaScript (protección contra XSS).
        </div>
      </div>
    </main>
  );
}
