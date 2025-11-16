"use client";

import React, { FormEvent, useState, useEffect } from "react";
import styled from "styled-components";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

type MakeFormProps = {
  onSubmit: (data: {
    nombre: string;
    descripcion: string;
    capacidad: number;
    ubicacion: string;
    imagenUrl: string;
  }) => Promise<void>;
  isEditing?: boolean;
  initialData?: {
    nombre: string;
    descripcion: string;
    capacidad: number;
    ubicacion: string;
    imagenUrl: string;
  };
};

const FormWrapper = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 400px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 2rem;
  border-radius: 12px;
  z-index: 999;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 1.7rem;
  font-weight: 300;
  margin-bottom: 1rem;
  color: #333;
`;

export const MakeForm = ({ onSubmit, isEditing = false, initialData }: MakeFormProps) => {
  const [loading, setLoading] = useState(false);

  // ✅ Estado controlado para los inputs
  const [nombre, setNombre] = useState(initialData?.nombre || "");
  const [descripcion, setDescripcion] = useState(initialData?.descripcion || "");
  const [capacidad, setCapacidad] = useState(initialData?.capacidad || 1);
  const [ubicacion, setUbicacion] = useState(initialData?.ubicacion || "");
  const [imagenUrl, setImagenUrl] = useState(initialData?.imagenUrl || "");

  // 🔄 Cuando initialData cambia (al abrir el modal), actualizamos los estados
  useEffect(() => {
    if (initialData) {
      setNombre(initialData.nombre);
      setDescripcion(initialData.descripcion);
      setCapacidad(initialData.capacidad);
      setUbicacion(initialData.ubicacion);
      setImagenUrl(initialData.imagenUrl);
    }
  }, [initialData]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit({ nombre, descripcion, capacidad, ubicacion, imagenUrl });
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormWrapper onSubmit={handleSubmit}>
      <Title>{isEditing ? "Editar Espacio" : "Crear Espacio"}</Title>

      <Input
        name="nombre"
        type="text"
        placeholder="Nombre del lugar"
        label="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
      />

      <Input
        name="descripcion"
        type="text"
        placeholder="Descripción del lugar"
        label="Descripción"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        required
      />

      <Input
        name="capacidad"
        type="number"
        placeholder="Capacidad máxima"
        label="Capacidad"
        value={capacidad}
        onChange={(e) => setCapacidad(Number(e.target.value))}
        required
        min={1}
      />

      <Input
        name="ubicacion"
        type="text"
        placeholder="Ubicación"
        label="Ubicación"
        value={ubicacion}
        onChange={(e) => setUbicacion(e.target.value)}
        required
      />

      <Input
        name="imagenUrl"
        type="text"
        placeholder="URL de la imagen"
        label="Imagen URL"
        value={imagenUrl}
        onChange={(e) => setImagenUrl(e.target.value)}
        required
      />

      <Button type="submit" loading={loading}>
        {isEditing ? "Guardar Cambios" : "Crear Espacio"}
      </Button>
    </FormWrapper>
  );
};
