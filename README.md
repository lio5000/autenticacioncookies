# Autenticación Segura con Cookies httpOnly en Next.js & Supabase

Este proyecto implementa una arquitectura de autenticación robusta y segura utilizando **Next.js 16+ (App Router)**, **Server Actions**, **Middleware de Next.js** y **Supabase SSR** (`@supabase/ssr`).

## Capas y Mecanismos de Seguridad Implementados

1. **Cookies `httpOnly`**:
   - La sesión de usuario y las tokens de refresco se gestionan del lado del servidor a través de cookies firmadas con el flag `httpOnly`.
   - Esto evita que scripts maliciosos del lado del cliente puedan acceder o robar los tokens de autenticación mediante `document.cookie`.

2. **Protección contra XSS (Cross-Site Scripting)**:
   - Al no almacenar los JWT ni credenciales en `localStorage` o `sessionStorage`, la aplicación es totalmente inmune a robos de sesión si existiera una vulnerabilidad XSS.

3. **Protección contra CSRF (Cross-Site Request Forgery)**:
   - Supabase SSR configura automáticamente banderas de seguridad `SameSite=Lax` y `Secure` en entornos de producción (HTTPS).
   - El uso de **Server Actions** en Next.js incluye validación de origen en el servidor.

4. **Protección de Rutas con Middleware**:
   - El archivo `middleware.ts` intercepta todas las peticiones entrantes antes de renderizar la vista.
   - Refresca la sesión automáticamente si el token está próximo a expirar.
   - Redirige usuarios no autenticados que intentan acceder a rutas privadas (`/dashboard`) hacia `/login`.
   - Redirige usuarios autenticados que intentan acceder a `/login` o `/register` hacia `/dashboard`.

## Instalación y Configuración Local

1. **Clonar el repositorio:**

   ```bash
   git clone [https://github.com/TU_USUARIO/auth-supabase-next.git](https://github.com/TU_USUARIO/auth-supabase-next.git)
   cd auth-supabase-next

   ```

2. **Instalar dependencias:**

   ```bash
   npm install

   ```

3. **Crear el archivo .env.local en la raíz con tus llaves de Supabase:**

   ```bash
   NEXT_PUBLIC_SUPABASE_URL=[https://tu-proyecto.supabase.co](https://tu-proyecto.supabase.co)
   NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key_aqui

   ```

4. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

## Tecnologías

- Next.js 16+ (App Router & Server Actions)
- Supabase SSR (@supabase/ssr & @supabase/supabase-js)
- TypeScript
- Tailwind CSS
