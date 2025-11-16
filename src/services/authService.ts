// src/services/authService.ts
const API_URL_RE = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`;
const API_URL_LOG = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`;

export async function signup({
  nombre,
  email,
  password,
  rol = "USUARIO", // valor por defecto si no se pasa
}: {
  nombre: string;
  email: string;
  password: string;
  rol?: string;
}) {
  const res = await fetch(`${API_URL_RE}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre, email, password, rol }),
  });

  const text = await res.text();
  if (!res.ok) throw new Error(text);

  return text; // "Usuario registrado exitosamente"
}

export async function login(email: string, password: string) {
  const res = await fetch(`${API_URL_LOG}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text);
  }

  return res.json(); // { token, email, rol }
}
