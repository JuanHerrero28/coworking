"use client";

import React, { FormEvent, useState, useEffect } from "react";
import styled from "styled-components";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

type MakeFormUserProps = {
  initialDataUser: {
    nombre: string;
    email: string;
    password: string;
    rol: string;
  };
  onSubmit: (data: {
    nombre: string;
    email: string;
    password: string;
    rol: string;
  }) => Promise<void>;
};

const FormWrapper = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 400px;
  background: white;
  padding: 1rem;
  border-radius: 12px;
  z-index: 999;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 1.7rem;
  font-weight: 400;
  margin-bottom: 1rem;
  color: #333;
`;

export const MakeFormUser = ({
  initialDataUser,
  onSubmit,
}: MakeFormUserProps) => {
  const [loading, setLoading] = useState(false);

  const [nombre, setNombre] = useState(initialDataUser?.nombre || "");
  const [email, setEmail] = useState(initialDataUser?.email || "");
  const [password, setPassword] = useState(initialDataUser?.password || "");
  const [rol, setRol] = useState(initialDataUser?.rol || "");

  useEffect(() => {
    if (initialDataUser) {
      setNombre(initialDataUser.nombre);
      setEmail(initialDataUser.email);
      setPassword(initialDataUser.password);
      setRol(initialDataUser.rol);
    }
  }, [initialDataUser]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit({ nombre, email, password, rol });
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormWrapper onSubmit={handleSubmit}>
      <Title>Editar Usuario</Title>

      <Input
        name="nombre"
        type="text"
        placeholder="Nombre del usuario"
        label="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
      />

      <Input
        name="email"
        type="email"
        placeholder="Correo electrónico"
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <select
        name="rol"
        value={rol} // valor controlado por estado
        onChange={(e) => setRol(e.target.value)}
        required
        style={{
          padding: "0.6rem",
          borderRadius: "8px",
          border: "1px solid #ccc",
          fontSize: "1rem",
        }}
      >
        <option value="">Selecciona un rol</option>
        <option value="ADMIN">Administrador</option>
        <option value="USUARIO">Usuario</option>
      </select>

      <Button type="submit" loading={loading}>
        Guardar Cambios
      </Button>
    </FormWrapper>
  );
};
