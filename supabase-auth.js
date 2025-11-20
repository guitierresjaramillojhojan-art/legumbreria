
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = "https://axuhliyyagummxkehdup.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF4dWhsaXl5YWd1bW14a2VoZHVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI5NDI2MjIsImV4cCI6MjA3ODUxODYyMn0.Ae86N7rDL9MTCD0z6fECa_H6nof5HrTORiY0wHsz_Hk";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export async function registrarUsuario(nombre, correo, contrasena) {
  const { data, error } = await supabase
    .from("usuarios")
    .insert([
      {
        nombre: nombre,
        correo: correo,
        contrasena: contrasena
      }
    ])
    .select()
    .single();

  if (error) {
    console.error("Error registrando usuario:", error);
    return { error };
  }

  localStorage.setItem("usuario", JSON.stringify(data));

  return { data };
}

export async function iniciarSesion(correo, contrasena) {
  const { data, error } = await supabase
    .from("usuarios")
    .select("*")
    .eq("correo", correo)
    .eq("contrasena", contrasena)
    .single();

  if (error || !data) {
    return { error: "Correo o contraseña incorrectos." };
  }


  localStorage.setItem("usuario", JSON.stringify(user));


  return { data };
}

export function obtenerUsuarioActivo() {
  const usuario = localStorage.getItem("usuario");
  return usuario ? JSON.parse(usuario) : null;
}

export function cerrarSesion() {
  localStorage.removeItem("usuario");
}
