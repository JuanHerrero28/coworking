"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import AuthForm from "@/components/forms/AuthForm";

export default function SignupPage() {
  const { signup } = useAuth();
  const router = useRouter();

  const handleSubmit = async (data: { name?: string; email: string; password: string; rol?: string }) => {
    if (data.password.length < 8) {
      toast.error("La contraseña debe tener al menos 8 caracteres");
      return;
    }

    try {
      await signup(
        data.name || "",
        data.email,
        data.password,
        data.rol || "USUARIO"
      );

      toast.success("¡Registro exitoso! Ahora podés iniciar sesión.");
      router.push("/login");
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Error al registrarse");
      }
    }
  };

  return <AuthForm type="signup" onSubmit={handleSubmit} />;
}

