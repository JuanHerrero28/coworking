"use client";

import { useRouter } from "next/navigation";
import { useSetAtom } from "jotai";
import { authTokenAtom, currentUserAtom } from "@/context/authAtom";
import * as api from "@/services/authService";
import { useState } from "react";

// ✅ Tipo de error estandarizado
interface ApiError {
  message: string;
  status?: number;
}

export function useAuth() {
  const setToken = useSetAtom(authTokenAtom);
  const setUser = useSetAtom(currentUserAtom);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ✅ Función de registro
  const signup = async (name: string, email: string, password: string, rol: string) => {
    try {
      setLoading(true);
      setError(null);

      const res = await api.signup({ nombre: name, email, password, rol });
      return res;

    } catch (err: unknown) {
      const error = err as ApiError;
      setError(error.message || "Error en el registro");
      throw err;

    } finally {
      setLoading(false);
    }
  };

  // ✅ Función de login
  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);

      const res = await api.login(email, password);

      const user = { email: res.email, rol: res.rol, id: res.id };

      setToken(res.token);
      setUser(user);

      localStorage.setItem("auth_token", res.token);
      localStorage.setItem("auth_user", JSON.stringify(user));
      localStorage.setItem("user_id", user.id.toString());

      if (user.rol === "ADMIN") {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }

    } catch (err: unknown) {
      const error = err as ApiError;
      setError(error.message || "Error en el login");
      throw err;

    } finally {
      setLoading(false);
    }
  };

  // ✅ Función de logout
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
    router.push("/login");
  };

  return { signup, login, logout, loading, error };
}
