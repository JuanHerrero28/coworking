"use client";

import { useAuth } from "@/hooks/useAuth";
import { toast } from "react-toastify";
import AuthForm from "@/components/forms/AuthForm";

export default function LoginPage() {
  const { login } = useAuth();

  const handleSubmit = async (data: { email: string; password: string }) => {
    try {
      await login(data.email, data.password);
      toast.success("Inicio de sesión exitoso 👋", { autoClose: 1500 });
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Credenciales inválidas");
      }
    }
  };

  return <AuthForm type="login" onSubmit={handleSubmit} />;
}
