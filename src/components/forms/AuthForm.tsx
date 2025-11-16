"use client";

import { FormEvent, useState } from "react";
import styled from "styled-components";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import CustomSelect from "@/components/ui/CustomSelect";
import { FaUserPlus, FaLock } from "react-icons/fa"; 
import Link from "next/link"; // 👈 para volver a la landing

type AuthFormProps = {
  type: "signup" | "login";
  onSubmit: (data: {
    name?: string;
    email: string;
    password: string;
    rol?: string;
  }) => Promise<void>;
};

const FormWrapper = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 400px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 2rem;
  border-radius: 12px;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 1.7rem;
  font-weight: 300;
  margin-bottom: 1rem;
  color: #333;
`;

const BackButton = styled(Link)`
  text-align: center;
  color: #666;
  font-size: 0.85rem;
  text-decoration: underline;
  margin-top: 0.5rem;
  transition: color 0.2s ease;

  &:hover {
    color: #000;
  }
`;

export default function AuthForm({ type, onSubmit }: AuthFormProps) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data = {
      name: form.get("name") as string | undefined,
      email: form.get("email") as string,
      password: form.get("password") as string,
      rol: form.get("rol") as string | undefined,
    };

    setLoading(true);
    try {
      await onSubmit(data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormWrapper onSubmit={handleSubmit}>
      {/* 👇 Título dinámico */}
      <Title>
        {type === "signup" ? (
          <>
            Crear cuenta <FaUserPlus size={15} />
          </>
        ) : (
          <>
            Iniciar sesión <FaLock size={15} /> 
          </>
        )}
      </Title>

      {type === "signup" && (
        <>
          <Input
            name="name"
            type="text"
            placeholder="Nombre"
            label="Nombre"
            required
          />

          <CustomSelect
            name="rol"
            label="Rol"
            required
            options={[
              { value: "", label: "Selecciona un rol" },
              { value: "ADMIN", label: "Administrador" },
              { value: "USUARIO", label: "Usuario" },
            ]}
          />
        </>
      )}

      <Input
        name="email"
        type="email"
        placeholder="Email"
        label="Email"
        required
      />
      <Input
        name="password"
        type="password"
        placeholder="Contraseña"
        label="Contraseña"
        required
      />

      <Button type="submit" loading={loading}>
        {type === "signup" ? "Registrarse" : "Iniciar sesión"}
      </Button>

      {/* 👇 Botón de volver */}
      <BackButton href="/">Volver al inicio</BackButton>
    </FormWrapper>
  );
}
